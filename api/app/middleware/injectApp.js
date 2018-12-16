const errors = require('../../config/errors');

module.exports = () => {
    return async function injectApp(ctx, next) {
        if (!ctx.inject) {
            ctx.inject = {}
        }

        const appid = ctx.request.query.appid || ctx.request.body.appid;
        if (!appid) {
            return errors.ErrAppNotFound;
        }
        const app = await ctx.service.app.findOne(appid);
        if (!app) {
            return errors.ErrAppNotFound;
        }
        ctx.inject.app = app
        return await next();
    };
};