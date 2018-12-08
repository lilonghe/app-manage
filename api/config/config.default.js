'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543759092421_3306';

  // add your config here
  config.middleware = [
    'bodyHandler'
  ];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'app-manage',
    username: 'root',
    password: 'lilonghe'
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:4000']
  }

  config.cors = {
    origin: 'http://localhost:4000',
    credentials: true
  }

  config.onerror = {
    all(err, ctx) {
      console.log(err);
      ctx.body = JSON.stringify({ error_message: err.message, error_code: 'unknown_error', stack: err });
      ctx.status = 200;
    }
  }

  return config;
};
