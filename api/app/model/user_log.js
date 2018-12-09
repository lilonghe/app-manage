'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserLog = app.model.define('user_log', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userid: INTEGER,
    action: STRING(30),
    action_type: STRING(30),
    reason: STRING(200),
    before: STRING(200),
    after: STRING(200),
    before_source: STRING(2000),
    after_source: STRING(2000),
    operator_user: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  UserLog.sync();

  return UserLog;
};