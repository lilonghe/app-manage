module.exports = () => {
    return async function bodyHandler(ctx, next) {
      const content = await next();
      if (!ctx.body && content) {
          ctx.body = content;
      }
    };
};