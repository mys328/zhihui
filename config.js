/**
 * config
 */

var path = require('path');

var config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  name: 'zhihui', // 社区名字
  description: 'zhihui', // 社区的描述
  keywords: 'nodejs, node, express, connect, socket.io',

  // mongodb 配置
  db: 'mongodb://127.0.0.1/zhihui',

  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,

};

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/zhihui_test';
}

module.exports = config;
