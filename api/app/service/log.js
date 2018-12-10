const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class LogService extends Service {
    async getAppLogs({ limit=20, offset=0 }) {
        const Sequelize = this.app.Sequelize;
        const data = await this.ctx.model.query(`
            SELECT app_logs.id, apps.appid, apps.name, app_logs.action, app_logs.action_type, app_logs.created_at FROM app_logs 
            left join apps on apps.id = app_logs.appid
            order by created_at desc
            limit ? offset ?
        `, { type: Sequelize.QueryTypes.SELECT, replacements:[limit, offset] });
        return data;
    }

    async getUserLogs({ limit=20, offset=0 }) {
        const Sequelize = this.app.Sequelize;
        const data = await this.ctx.model.query(`
            SELECT user_logs.id, users.userid, users.name, users.dept_name, user_logs.after, user_logs.action, user_logs.action_type, user_logs.created_at FROM user_logs
            left join users on users.id = user_logs.userid
            order by user_logs.created_at desc
            limit ? offset ?
        `, { type: Sequelize.QueryTypes.SELECT, replacements:[limit, offset] });
        return data;
    }
}
module.exports = LogService;