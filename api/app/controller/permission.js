'use strict';

const Controller = require('egg').Controller;
const errors = require('../../config/errors');
const helpers = require('../../config/helpers');

class PermissionController extends Controller {
    async getAppSchema() {
        const appid = this.ctx.queries.appid;
        if (!appid) {
            return error.ErrMissParam;
        }
        return await this.ctx.service.permission.getPermissionsByApp(this.ctx.request.query.appid);
    }

    async addPermission() {
        console.log(this.ctx.request.body);
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
            title: { type: 'string'},
            type: { type: 'string', default: 'permission', required: false},
            public: { type: 'bool', default: false, required: false },
            description: { type: 'string', required: false },
            url: { type: 'string', required: false},
            style: { type: 'string', required: false },
            icon: { type: 'string', required: false },
            parentId: { type: 'int', required: false}
        };
        this.ctx.validate(createRule);

        const permCheck = helpers.CheckPermissionType(this.ctx.request.body.type);
        if (permCheck) {
            return permCheck;
        }

        return await this.ctx.service.permission.addAppPermission(this.ctx.request.body);
    }

    async editPermission() {
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
            title: { type: 'string'},
            type: { type: 'string', default: 'permission', required: false},
            public: { type: 'bool', default: false, required: false },
            description: { type: 'string', required: false },
            url: { type: 'string', required: false},
            style: { type: 'string', required: false },
            icon: { type: 'string', required: false },
            parentId: { type: 'int', required: false}
        };
        this.ctx.validate(createRule);

        const permCheck = helpers.CheckPermissionType(this.ctx.request.body.type);
        if (permCheck) {
            return permCheck;
        }

        const changedRows = await this.ctx.service.permission.editAppPermission(this.ctx.request.body);
        return helpers.ActionResult(changedRows > 0);
    }

    async removePermission() {
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
        }
        this.ctx.validate(createRule);
        
        const rows = await this.ctx.service.permission.removePermission(this.ctx.request.body);
        return helpers.ActionResult(rows > 0);
    }

    async getAppRoles() {
        const { appid, with_permission} = this.ctx.request.query;
        if (!appid) {
            return errors.ErrMissParam;
        }

        return await this.ctx.service.role.getAppRoles(appid, with_permission)
    }

    async getAppRolePermissions() {
        const {appid, role_code} = this.ctx.request.queries;
        return await this.ctx.service.role.getRolePermissions(appid, role_code)
    }

    async addAppRole() {
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
            name: { type: 'string'},
            description: { type:'string', required: false }
        }
        this.ctx.validate(createRule);
        return await this.ctx.service.role.addAppRole(this.ctx.request.body);
    }

    async editAppRole() {
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
            name: { type: 'string'},
            description: { type:'string', required: false }
        }
        this.ctx.validate(createRule);
        const changedRows = await this.ctx.service.role.editAppRole(this.ctx.request.body);
        if (isNaN(changedRows)) {
            return changedRows;
        }
        return helpers.ActionResult(changedRows > 0);
    }

    async removeAppRole() {
        const createRule = {
            appid: { type: 'string' },
            code: { type: 'string' },
        }
        this.ctx.validate(createRule);
        const changedRows = await this.ctx.service.role.removeAppRole(this.ctx.request.body);
        if (isNaN(changedRows)) {
            return changedRows;
        }
        return helpers.ActionResult(changedRows > 0);
    }

    async addRolePermission() {
        const createRule = {
            appid: { type: 'string' },
            role_code: { type: 'string' },
            permission_code: { type: 'string'},
            description: { type:'string', required: false }
        }
        this.ctx.validate(createRule);
        return await this.ctx.service.role.addAppRolePermission(this.ctx.request.body);
    }

    async removeRolePermission() {
        const createRule = {
            appid: { type: 'string' },
            role_code: { type: 'string' },
            permission_code: { type: 'string'},
        }
        this.ctx.validate(createRule);
        return await this.ctx.service.role.removeAppRolePermission(this.ctx.request.body);
    }

    async setRolePermission() {
        const createRule = {
            appid: { type: 'string' },
            role_code: { type: 'string' },
            permission_codes: { type: 'array'},
        }
        this.ctx.validate(createRule);
        return await this.ctx.service.role.setAppRolePermission(this.ctx.request.body);
    }
}

module.exports = PermissionController;