const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const _ = require('lodash');
const namespace = cls.createNamespace('sql-db-namespace');
Sequelize.useCLS(namespace);
const models = {
  hole: require('./hole')(Sequelize),
  comment: require('./comment')(Sequelize),
  gzh_msg: require('./gzh_msg')(Sequelize),
  article: require('./article')(Sequelize),
  qw_group_ymqq: require('./qw_group_ymqq')(Sequelize),
};

module.exports = (app) => {
  /* 定义数据库实例 */
  const sqlConfig = app.config.sequelize.datasources[0];
  const sqlModel = new Sequelize(
    sqlConfig.database, // 数据库名
    sqlConfig.username, // 用户名
    sqlConfig.password, // 用户密码
    {
      dialect: sqlConfig.dialect, // 数据库使用mysql
      host: sqlConfig.host, // 数据库服务器ip
      port: sqlConfig.port, // 数据库服务器端口
      define: {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        underscored: true,
      },
      typeValidation: true, //是否需要验证
      timezone: '+08:00', //时区
      logging: function (str) {
        app.logger.info('SQL语句', str);
      },
    }
  );
  /* 模型实例化 */
  const sqlModelsIns = {};
  _.mapKeys(models, (value, key) => {
    sqlModelsIns[transformStr3(key)] = sqlModel.define(key, value, {
      freezeTableName: true, // Model 对应的表名将与model名相同
      charset: 'utf8mb4',
      timestamps: false, //去除createAt updateAt
    });
  });

  // 下划线转驼峰cms_user => cmsUser
  function transformStr3(str) {
    var re = /_(\w)/g;
    return str.replace(re, function ($0, $1) {
      $0;
      return $1.toUpperCase();
    });
  }

  //模型导出
  return Object.assign(
    {
      sqlModel,
    },
    sqlModelsIns
  );
};
