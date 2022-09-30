import Redis from 'egg-redis';
import Mysql from 'egg-mysql';
import Sequelize from 'sequelize';

declare module 'egg' {
  // 扩展 app
  interface Application {
    redis: Redis;
    mysql: Mysql;
    Sequelize: Sequelize;
    model: Sequelize.Sequelize;
    seqIns: any;
    aliOssClient: any;
  }

  // 扩展 context
  interface Context {
    Sequelize: Sequelize;
    model: Sequelize.Sequelize;
  }

  // 扩展你的配置
  interface EggAppConfig {
    sequelize: {
      datasources: Array;
      dialect: string;
      delegate: string;
      baseDir: string;
      database: string;
      host: string;
      port: string;
      username: string;
      password: string;
    };
  }
}
