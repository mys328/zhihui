var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./DocType');
require('./Doc');
require('./GZH');
require('./DocState');

exports.DocType = mongoose.model('DocType');
exports.Doc = mongoose.model('Doc');
exports.GZH = mongoose.model('GZH');
exports.DocState = mongoose.model('DocState');