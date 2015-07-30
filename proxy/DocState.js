var models = require('../models');
var DocState = models.DocState;


/**
 * 新增一个文档的统计信息
 * @param  {String}		docId 文档的id
 * @param  {Number}		PV 文档的阅读量
 * @param  {Number}		dotNum 文档的点赞量
 * @param  {String}		typeId 文档的分类
 * @param  {Function}	callback 回调函数
 */
exports.newAndSave = function(docId,PV,dotNum,typeId,callback) {
	var docState = new DocState();
	docState.docId=docId;
	docState.PV=PV;
	docState.dotNum=dotNum;
	docState.typeId=typeId;
	docState.save(callback);
};