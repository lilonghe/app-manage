'use strict';

const Controller = require('egg').Controller;
const errors = require('../../config/errors');
const helpers = require('../../config/helpers');

class UserController extends Controller {

    async getUsers() {
        let { limit, offset, keyword } = this.ctx.request.query;
        if (!limit || !offset) {
            return errors.ErrMissParam;
        }
        
        limit = parseInt(limit);
        offset = parseInt(offset);
        
        if (limit > 100) {
            limit = 100;
        }

        

        return this.ctx.service.user.getUsers(limit, offset, keyword);
    }

    async addUser() {
        const rule = {
            userid: 'string',
            name: 'string',
            dept_name: 'string',
            remark:{type: 'string', required:false}
        }
        this.ctx.validate(rule)
        return await this.ctx.service.user.addUser(this.ctx.request.body)
    }

    async editUser() {
        const rule = {
            userid: 'string',
            name: 'string',
            dept_name: 'string',
            remark:{type: 'string', required:false}
        }
        this.ctx.validate(rule)
        return await this.ctx.service.user.editUser(this.ctx.request.body)
    }

    async addUserAppRole() {
        const rule = {
            user_id: 'int',
            role_id: 'int'
        }
        this.ctx.validate(rule)
        return this.ctx.service.user.addUserAppRole(this.ctx.request.body)
    }

    async removeUserAppRole() {
        const rule = {
            user_id: 'int',
            role_id: 'int'
        }
        this.ctx.validate(rule)
        return this.ctx.service.user.removeUserAppRole(this.ctx.request.body)
    }

    async getUserAppRoles() {
        const { appid, user_id } = this.ctx.request.query;
        if (!appid || !user_id) {
            return errors.ErrMissParam;
        }

        return await this.ctx.service.user.getUserAppRoles(appid, user_id);
    }

}

module.exports = UserController;