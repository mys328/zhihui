var models = require('../models');
var DocType = models.DocType;

/**
 * @param  {String} [htmlId] [分类的ID，需要和sougou 微信搜索的分类id一致]
 * @param  {String} [typeName] [分类的描述信息]
 * @param {Function} [callback] [新增完毕后的回调]
 */
exports.newAndSave = function(htmlId, typeName, callback) {
	var docType = new DocType();
	docType.htmlId = htmlId;
	docType.typeName = typeName;
	docType.save(callback);
};
/**
 * 查询全部的分类
 * @param  {Function} 回调方法
 */
exports.all = function(callback) {
	DocType.find({}, function(err, docs) {
		callback(err, docs);
	});
};