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
            appi: data.appid,
            before_source: JSON.stringify(oldPerm)
        }

        data.id = oldPerm.id;
        patchInfo.after_source = JSON.stringify(data);

        let changeRows = await this.ctx.model.transaction(async (t) => {
            let rows = await this.ctx.model.Permission.update({ ...oldPerm,...data }, {where: { id: oldPerm.id }});
            await this.ctx.model.AppLog.create(patchInfo);
            return rows;
        });
        return helpers.SequelizeUpdateResu(changeRows);
    }

    async getAppPermissionByCodeAndApp(appid, code) {
        return await this.ctx.model.Permission.findOne({ where: { appid, code }, raw: true });
    }
}

module.exports = PermissionService;