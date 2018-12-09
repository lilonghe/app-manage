const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class UserService extends Service {

    async getUsers(limit, offset) {
        const users = await this.ctx.model.User.findAll({ limit, offset });
        const count = await this.ctx.model.User.count();
        return { data: users, total: count }
    }

    async addUser(data) {
        let repeatedUser = await this.getUserByUserid(data.userid);
        if (repeatedUser) {
            return errors.ErrRepeatedUser;
        }

        let patchInfo = {
            action_type: 'userinfo',
            action:'create'
        }

        return await this.ctx.model.transaction(async (t) => {
            const user = await this.ctx.model.User.create(data, {transaction: t});
            patchInfo.userid = user.id;
            patchInfo.after_source = JSON.stringify(user);
            await this.ctx.model.UserLog.create(patchInfo, {transaction: t});
            return user;
        });
    }

    async editUser(data) {
        let repeatedUser = await this.getUserByUserid(data.userid);
        if (!repeatedUser) {
            return errors.ErrUserNotFound;
        }
        
        let patchInfo = {
            action_type: 'userinfo',
            action:'create',
            userid: repeatedUser.id
        }

        return await this.ctx.model.transaction(async (t) => {
            const user = await this.ctx.model.User.update(data, { where:{ id: repeatedUser.id } }, {transaction: t});
            patchInfo.userid = user.id;
            patchInfo.after_source = JSON.stringify(user);
            await this.ctx.model.UserLog.create(patchInfo, {transaction: t});
            return user;
        });
    }

    async getUserByUserid(userid) {
        return await this.ctx.model.User.findOne({where: { userid }});
    }
}

module.exports = UserService;