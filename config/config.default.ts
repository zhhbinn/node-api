import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path');

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629442448309_2500';

  // add your egg config in here

  // add your special config in here
  const bizConfig = {
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

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
