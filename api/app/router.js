'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/apps', controller.app.index);
  router.get('/apps/:appid', controller.app.getOne);
  router.post('/apps', controller.app.create);
  router.put('/apps', controller.app.edit);


  router.get('/permissions', controller.permission.getAppSchema);
  router.post('/permissions', controller.permission.addPermission);
  router.put('/permissions', controller.permission.editPermission);

  router.get('/roles', controller.permission.getAppRoles);
  router.post('/roles', controller.permission.addAppRole);
  router.put('/roles', controller.permission.editAppRole);

  router.get('/roles/permissions', controller.permission.getAppRolePermissions);
  router.post('/roles/permissions', controller.permission.addRolePermission);
  router.delete('/roles/permissions', controller.permission.removeRolePermission);
  router.put('/roles/permissions', controller.permission.setRolePermission);

  router.get('/users', controller.user.getUsers);
  router.post('/users', controller.user.addUser);
  router.put('/users', controller.user.editUser);

};
