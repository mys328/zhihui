var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
/**
 * 公众号的模型 （GZH 1-n Doc）
 * @type {Schema}
 */
var GZHSchema = new Schema({
  imgURL: { type: String},//公众号的图标
  openId: { type: String},//公众号的openId
  name: { type: String},//公众号的名称
  isV: { type: Boolean},//公众号是否认证
  company: { type: Boolean},//公众号认证的公司
  code: { type: String},//公众号的微信号
  desc: { type: String},//公众号的功能介绍
  userNum:{type:Number, default:0},//公众号的粉丝数量
  createTime: { type: Date, default: Date.now }
});

GZHSchema.plugin(BaseModel);

GZHSchema.index({openId: 1}, {unique: true});
GZHSchema.index({name: 1});
GZHSchema.index({code: 1});

mongoose.model('GZH', GZHSchema);
