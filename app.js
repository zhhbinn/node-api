'use strict';

const seqIns = require('./app/model/init');

module.exports = async (app) => {
  app.seqIns = seqIns(app);
};
