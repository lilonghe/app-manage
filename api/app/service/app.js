const Service = require('egg').Service;
const helpers = require('../../config/helpers');
const errors = require('../../config/errors');

class AppService extends Service {
  async findAll() {
    const apps = await this.ctx.model.App.findAll({ raw: true });
    return apps;
  }

  async create({ appid, name, description }) {
    const { Op } = this.app.Sequelize;
    let oldApp = await this.ctx.model.App.findOne({ where: {
      [Op.or]: [{appid}, {name}]
    }})
    if (oldApp) {
      return errors.ErrAppAlreadyExists;
    }

    let patchInfo = {
      action_type: 'add_app', 
      after_source: JSON.stringify({...oldApp, name, description})
    };

    let newApp = await this.ctx.model.transaction(async (t) => {
      const app = await this.ctx.model.App.create({ appid, name, description }, {transaction: t});
      patchInfo.appid = app.id;
      patchInfo.after_source = JSON.stringify(app);
      await this.ctx.model.AppLog.create(patchInfo, {transaction: t});
      return app;
    })

    return newApp;
  }

  async findOne(appid) {
    return await this.ctx.model.App.findOne({ where: { appid }, raw: true })
  }

  async editApp({ appid, name, description }, patchInfo={}) {
    let oldApp = await this.findOne(appid);
    if (!oldApp) {
      return errors.ErrAppNotFound;
    }
    patchInfo = {...patchInfo, 
      appid: oldApp.id,
      before_source: JSON.stringify(oldApp),
      action_type: 'edit_app', 
      after_source: JSON.stringify({...oldApp, name, description})
    };

    let updated = await this.ctx.model.transaction(async (t) => {
      let rows = await this.ctx.model.App.update({name, description},{where: { appid }}, {transaction: t});
      await this.ctx.model.AppLog.create(patchInfo, {transaction: t})
      return rows;
    });

    return helpers.SequelizeUpdateResu(updated);
  }
}

module.exports = AppService;