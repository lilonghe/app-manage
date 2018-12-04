'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/apps', controller.app.index);
  router.post('/apps', controller.app.create);
  router.put('/apps', controller.app.edit);
};
