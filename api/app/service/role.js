const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class RoleService extends Service {
    async getAppRoles(appid) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        return await this.ctx.model.Role.findAll({ where: { appid: app.id } });
    }

    async addAppRole(data) {
        const app = await this.ctx.service.app.findOne(data.appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        data.appid = app.id

        const checkRepeated = await this.getRoleByAppIdAndCode(app.id, data.code);
        if (checkRepeated) {
            return errors.ErrRoleCodeAlreadyExists;
        }

        let patchInfo = { 
            action_type: 'role',
            action: 'add',
            appid: data.appid,
        }

        let newRole = await this.ctx.model.transaction(async (t) => {
            const role = await this.ctx.model.Role.create(data, { transaction: t });
            patchInfo.after_source = JSON.stringify(role);
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return role;
        });
        return newRole;
    }

    async editAppRole(data) {
        const app = await this.ctx.service.app.findOne(data.appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        data.appid = app.id

        const oldRole = await this.getRoleByAppIdAndCode(app.id, data.code);
        if (!oldRole) {
            return errors.ErrRoleCodeNotFound;
        }

        data.permission = oldRole.permission;

        let patchInfo = { 
            action_type: 'role',
            action: 'add',
            appid: data.appid,
            before_source: JSON.stringify(oldRole)
        }

        let newRole = await this.ctx.model.transaction(async (t) => {
            const role = await this.ctx.model.Role.update(data, { where: { id: oldRole.id } }, { transaction: t });
            patchInfo.after_source = JSON.stringify(role);
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return role;
        });
        return newRole;
    }

    async addAppRolePermission({ appid, role_code, permission_code }) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const oldRole = await this.getRoleByAppIdAndCode(app.id, role_code);
        if (!oldRole) {
            return errors.ErrRoleCodeNotFound;
        }

        const permission = await this.ctx.service.permission.getAppPermissionByCodeAndApp(app.id, permission_code);
        if(!permission) {
            return errors.ErrPermissionCodeNotFound;
        }

        const repeated = await this.ctx.model.RolePermission.findOne({ where: { appid: app.id, role_code, permission_code } })
        if (repeated) {
            return errors.ErrPermissionCodeAlreadyExists;
        }

        let patchInfo = { 
            action_type: 'role',
            action: 'add_permission',
            appid: app.id
        }

        let newRolePermission = await this.ctx.model.transaction(async (t) => {
            const rolePermission = await this.ctx.model.RolePermission.create({  
                appid: app.id, role_code: oldRole.code, permission_code: permission_code 
            }, { transaction: t });

            patchInfo.after_source = JSON.stringify(rolePermission);
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return rolePermission;
        });
        return newRolePermission;
    }

    async removeAppRolePermission({ appid, role_code, permission_code }) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const oldRole = await this.getRoleByAppIdAndCode(app.id, role_code);
        if (!oldRole) {
            return errors.ErrRoleCodeNotFound;
        }

        const permission = await this.ctx.service.permission.getAppPermissionByCodeAndApp(app.id, permission_code);
        if(!permission) {
            return errors.ErrPermissionCodeNotFound;
        }

        const repeated = await this.ctx.model.RolePermission.findOne({ where: { appid: app.id, role_code: oldRole.code, permission_code: permission_code } })
        if (!repeated) {
            return errors.ErrPermissionCodeNotFound;
        }

        let patchInfo = { 
            action_type: 'role',
            action: 'remove_permission',
            appid: app.id,
            before_source: JSON.stringify(repeated)
        }

        let resu = await this.ctx.model.transaction(async (t) => {
            const result = await this.ctx.model.RolePermission.destroy({where: { id: repeated.id } }, { transaction: t });
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
            return result;
        });
        return resu;
    }

    async getRoleByAppIdAndCode(appid, code) {
        return await this.ctx.model.Role.findOne({ where: { appid, code } });
    }

    async getRolePermissions(appid, code) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const permCodes = await this.ctx.model.RolePermission.findAll({ where: { appid:app.id, role_code: code }, raw: true });
        let permCodesArr = [];
        permCodes.map(item => permCodesArr.push(item.permission_code));
        
        const { Op } = this.app.Sequelize;
        const perms = await this.ctx.model.Permission.findAll({ where: { appid: app.id, code: {
            [Op.in]: permCodesArr
        }}});
        return perms;
    }

    async setAppRolePermission({ appid, role_code, permission_codes }) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const oldRole = await this.getRoleByAppIdAndCode(app.id, role_code);
        if (!oldRole) {
            return errors.ErrRoleCodeNotFound;
        }

        let codes = {};
        permission_codes.map(code => codes[code] = 1);
        permission_codes = Object.keys(codes);

        const { Op } = this.app.Sequelize;
        const perms = await this.ctx.model.Permission.findAll({ where: { appid: app.id, code: {
            [Op.in]: permission_codes
        }}});
        if (permission_codes.length != perms.length) {
            return errors.ErrPermissionCodes;
        }

        // const permission = await this.ctx.service.permission.getAppPermissionByCodeAndApp(app.id, permission_code);
        // if(!permission) {
        //     return errors.ErrPermissionCodeNotFound;
        // }

        // const repeated = await this.ctx.model.RolePermission.findOne({ where: { appid: app.id, role_code, permission_code } })
        // if (repeated) {
        //     return errors.ErrPermissionCodeAlreadyExists;
        // }

        let patchInfo = { 
            action_type: 'role',
            action: 'set_permission',
            appid: app.id,
            after_source: JSON.stringify(permission_codes)
        }

        await this.ctx.model.transaction(async (t) => {
            // remove all
            await this.ctx.model.RolePermission.destroy({ where: { appid: app.id, role_code: oldRole.code } }, { transaction: t })
            // loop check then add.
            for(let i=0; i<permission_codes.length; i++) {
                await this.ctx.model.RolePermission.create({  
                    appid: app.id, role_code: oldRole.code, permission_code: permission_codes[i] 
                }, { transaction: t });
            }
            await this.ctx.model.AppLog.create(patchInfo, { transaction: t });
        });
        return [permission_codes.length];
    }
}

module.exports = RoleService;