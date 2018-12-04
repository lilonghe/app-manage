'use strict';

const Controller = require('egg').Controller;
const errors = require('../../config/errors');
const helpers = require('../../config/helpers');

class AppController extends Controller {
  async index() {
    return await this.ctx.service.app.findAll();
  }
  
  async create() {
    const { ctx, service } = this;
    const createRule = {
      appid: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    };
    ctx.validate(createRule);

    return await service.app.create(ctx.request.body);
  }

  async edit() {
    const { ctx, service } = this;
    const createRule = {
      appid: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    };
    ctx.validate(createRule);

    const rows = await service.app.editApp(ctx.request.body)
    return helpers.ActionResult(rows > 0);
  }

}

module.exports = AppController;
