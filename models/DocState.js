var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
/**
 * [一个Doc对应多个DocState]
 * 对文章进行统计
 * @type {Schema}
 */
var DocStateSchema = new Schema({
  docId: { type: String},//文档id 从页面上爬去得到的id关联 Doc对象的htmlId
  PV:{ type: Number, default: 0 },//访问量(阅读量)
  dotNum:{ type: Number, default: 0 },//当前点赞的次数
  typeId:{ type: String },//文档对应的类型
  createTime: { type: Date, default: Date.now }//状态产生的创建时间
});

DocStateSchema.plugin(BaseModel);

DocStateSchema.index({htmlId: 1});
DocStateSchema.index({createTime: 1});
DocStateSchema.index({typeId: 1});

mongoose.model('DocState', DocStateSchema);
