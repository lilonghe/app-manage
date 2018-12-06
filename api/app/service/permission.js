const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class PermissionService extends Service {
    async getPermissionsByApp() {
        return await this.ctx.model.Permission.findAll({ where: { appid } });
    }
 
    async addAppPermission(data) {
        // 检查是否重复
        let oldPerm = await this.getAppPermissionByCodeAndApp(data.appid, data.code);
        if (oldPerm) {
            return errors.ErrPermissionCodeAlreadyExists;
        }
        let patchInfo = { 
            action_type: 'edit_permission',
            action: 'add',
            appi: DataTransfer.appid,
        }

        let newPermission = await this.ctx.model.transaction(async (t) => {
            const permission = await this.ctx.model.Permission.create(data, { transaction: t });
            patchInfo.after_source = JSON.stringify(permission);
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
        });
        return newPermission;
    }

    async editAppPermission(data) {
        let oldPerm = await this.getAppPermissionByCodeAndApp(data.appid, data.code);
        if (!oldPerm) {
            return errors.ErrPermissionCodeNotFound;
        } 

        let patchInfo = { 
            action_type: 'edit_permission',
            action: 'edit',
            appi: DataTransfer.appid,
            before_source: JSON.stringify(oldPerm)
        }

        data.id = oldPerm.id;
        patchInfo.after_source = JSON.stringify(data);

        let newPermission = await this.ctx.model.transaction(async (t) => {
            let rows = await this.ctx.model.Permission.update({ ...data,...oldPerm }, {where: { appid: oldPerm.appid, code: oldPerm.code }});
            await this.ctx.model.AppLog.create(patchInfo);
        });
        return helpers.SequelizeUpdateResu(rows);
    }

    async getAppPermissionByCodeAndApp(appid, code) {
        return await this.ctx.model.Permission.findOne({ where: { appid, code }, raw: true });
    }
}