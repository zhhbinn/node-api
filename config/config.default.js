/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = appInfo.name + '_1670635744624_7774';



  config.logger = {
    level: 'WARN',
    dir: path.join(appInfo.baseDir, './logs/api/'),
    consoleLevel: 'DEBUG',
    outputJSON: true,
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7075,
      hostname: '127.0.0.1',
    },
  };

  config.middleware = ['routerError'];

  config.security = {
    csrf: {
      enable:false,
      ignore: (ctx) => {
        const ignorePaths = [''];
        return ignorePaths.indexOf(ctx.request.url.split('?')[0]) !== -1;
      },
    },
  };

  // add your user config here
  const userConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    sequelize: {
      datasources: [
        {
          host: '1.117.222.11',
          port: 3306,
          database: 'yigeyu',
          username: 'root',
          dialect: 'mysql',
          password: 'USWqm3pTM5!',
        },
      ],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
