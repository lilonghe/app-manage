'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const UserRole = app.model.define('user_role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_id: INTEGER,
    user_id: INTEGER,
    app_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  UserRole.sync();

  return UserRole;
};