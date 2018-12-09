const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class UserService extends Service {

    async getUsers(limit, offset, keyword) {
        let users = [], count = 0;
        if (keyword) {
            const { Op } = this.app.Sequelize;
            keyword += "%";
            const sql = { limit, offset, where: { [Op.or]: [
                { name: { [Op.like]: keyword } },
                { userid:{ [Op.like]: keyword } }
            ]}};
            users = await this.ctx.model.User.findAll(sql);
            count = await this.ctx.model.User.count(sql);
        } else {
            users = await this.ctx.model.User.findAll({ limit, offset });
            count = await this.ctx.model.User.count();
        }
        
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

    async getUserById(id) {
        return await this.ctx.model.User.findOne({where: { id }});
    }

    async addUserAppRole({ role_id, user_id }) {
        const user = await this.getUserById(user_id);
        if (!user) {
            return errors.ErrUserNotFound;
        }

        const role = await this.ctx.service.role.getAppRoleById(role_id);
        if (!role) {
            return errors.ErrRoleCodeNotFound;
        }

        const repeated = await this.getInfoByRoleAndUser({role_id, user_id});
        if (repeated) {
            return errors.ErrUserAleradyHasRole;
        }

        let patchInfo = {
            action_type: 'user_permission',
            action:'add_role',
            userid: user.id,
        }

        await this.ctx.model.transaction(async (t) => {
            const userRole = await this.ctx.model.UserRole.create({
                role_id, user_id: user.id, app_id: role.appid
            }, {transaction: t});

            patchInfo.after_source = JSON.stringify(userRole);
            await this.ctx.model.UserLog.create(patchInfo, {transaction: t});
            return userRole;
        });
        return helpers.ActionResult(true);
    }

    async removeUserAppRole({ role_id, user_id }) {
        const user = await this.getUserById(user_id);
        if (!user) {
            return errors.ErrUserNotFound;
        }

        const role = await this.ctx.service.role.getAppRoleById(role_id);
        if (!role) {
            return errors.ErrRoleCodeNotFound;
        }

        const repeated = await this.getInfoByRoleAndUser({role_id, user_id});
        if (!repeated) {
            return errors.ErrUserNotHasRole;
        }

        let patchInfo = {
            action_type: 'user_permission',
            action:'remove_role',
            userid: user.id,
            before_source: JSON.stringify(repeated)
        }

        await this.ctx.model.transaction(async (t) => {
            const userRole = await this.ctx.model.UserRole.destroy({ where:{ id: repeated.id } }, {transaction: t});
            await this.ctx.model.UserLog.create(patchInfo, {transaction: t});
            return userRole;
        });
        return helpers.ActionResult(true);
    }

    async getInfoByRoleAndUser({ role_id, user_id }) {
        return await this.ctx.model.UserRole.findOne({ where:{ role_id, user_id } })
    }

    async getUserAppRoles(appid, user_id) {
        const app = await this.ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }

        const arrs = await this.ctx.model.UserRole.findAll({ attributes: ['role_id'], where: { app_id: app.id, user_id } });
        let ids = [];
        arrs.map(item => {
            ids.push(item.role_id)
        });

        return ids;
    }
}

module.exports = UserService;