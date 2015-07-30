var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
/**
 * 文档对象（type 1-n Doc ,gzh 1-n Doc, Doc 1-n DocState）
 * @type {Schema}
 */
var DocSchema = new Schema({
  htmlId: { type: String},//文档id 从页面上爬去得到的id
  title: { type: String},//文档标题
  imgURL: { type: String},//文档缩略图
  desc: { type: String},//描述
  openURL: { type: String},//打开的原始地址
  gzhOpenId: { type: String},//公众号的openId
  sendDate: { type: String },//文章发布的日期格式”yyyy-MM-dd“
  sendTime: { type: String },//文章发布的时间”HH-mm-ss“
  createTime: { type: Date, default: Date.now },//爬取时的创建时间
  typeId: { type: String},//类型id
  content: { type: String}//文档内容（包含html标签的内容）
});

DocSchema.plugin(BaseModel);

DocSchema.index({htmlId: 1}, {unique: true});
DocSchema.index({gzhOpenId: 1});
DocSchema.index({sendTime: -1});
DocSchema.index({typeId: 1});

mongoose.model('Doc', DocSchema);
