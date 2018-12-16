'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const RolePermission = app.model.define('role_permission', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appid: INTEGER,
    role_id: INTEGER,
    permission_id: INTEGER,
    role_code: STRING(50),
    permission_code: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  RolePermission.sync();

  return RolePermission;
};