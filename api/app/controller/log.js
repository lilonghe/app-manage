'use strict';

const Controller = require('egg').Controller;
const errors = require('../../config/errors');
const helpers = require('../../config/helpers');

class LogController extends Controller {
    async getAppLogs() {
        let { limit=20, offset=0 } = this.ctx.request.query;
        limit = parseInt(limit);
        offset = parseInt(offset);

        return await this.ctx.service.log.getAppLogs({limit, offset});
    }

    async getUserLogs() {
        let { limit=20, offset=0 } = this.ctx.request.query;
        limit = parseInt(limit);
        offset = parseInt(offset);
        
        return await this.ctx.service.log.getUserLogs({limit, offset});
    }

}

module.exports = LogController;