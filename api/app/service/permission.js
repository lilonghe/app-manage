const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class PermissionService extends Service {
    async getPermissionsByApp(appid) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        
        return await this.ctx.model.Permission.findAll({ where: { appid: app.id } });
    }
 
    async addAppPermission(data) {
        const app = await this.ctx.service.app.findOne(data.appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        data.appid = app.id;

        // 检查是否重复
        const oldPerm = await this.getAppPermissionByCodeAndApp(data.appid, data.code);
        if (oldPerm) {
            return errors.ErrPermissionCodeAlreadyExists;
        }

        let patchInfo = { 
            action_type: 'edit_permission',
            action: 'add',
            appid: data.appid,
            after: `添加[${data.name}]权限`
        }

        let newPermission = await this.ctx.model.transaction(async (t) => {
            const permission = await this.ctx.model.Permission.create(data, { transaction: t });
            patchInfo.after_source = JSON.stringify(permission);
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return permission;
        });
        return newPermission;
    }

    async editAppPermission(data) {
        const app = await this.ctx.service.app.findOne(data.appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        data.appid = app.id;

        const oldPerm = await this.getAppPermissionByCodeAndApp(data.appid, data.code);
        if (!oldPerm) {
            return errors.ErrPermissionCodeNotFound;
        } 

        let patchInfo = { 
            action_type: 'edit_permission',
            action: 'edit',
            appid: data.appid,
            before_source: JSON.stringify(oldPerm),
            after: `编辑[${oldPerm.name}]权限`
        }

        data.id = oldPerm.id;
        patchInfo.after_source = JSON.stringify(data);

        let changeRows = await this.ctx.model.transaction(async (t) => {
            let rows = await this.ctx.model.Permission.update({ ...oldPerm,...data }, {where: { id: oldPerm.id }, transaction: t});
            await this.ctx.model.AppLog.create(patchInfo);
            return rows;
        });
        return helpers.SequelizeUpdateResu(changeRows);
    }

    async removePermission({ appid, code }) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const oldPerm = await this.getAppPermissionByCodeAndApp(app.id, code);
        if (!oldPerm) {
            return errors.ErrPermissionCodeNotFound;
        } 

        let patchInfo = { 
            action_type: 'delete_permission',
            action: 'delete',
            appid: app.id,
            before_source: JSON.stringify(oldPerm),
            after: `移除[${oldPerm.name}]权限`
        }

        let rows =  await this.ctx.model.transaction(async (t) => {
            // remove permission
            let rows = await this.ctx.model.Permission.destroy({where: { id: oldPerm.id }, transaction: t});
            // remove role permission map item, role patch ?
            await this.ctx.model.RolePermission.destroy({where: { permission_id: oldPerm.id }, transaction: t });
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return rows;
        });

        return helpers.SequelizeUpdateResu(rows);
    }

    async getAppPermissionByCodeAndApp(appid, code) {
        return await this.ctx.model.Permission.findOne({ where: { appid, code }, raw: true });
    }
}

module.exports = PermissionService;