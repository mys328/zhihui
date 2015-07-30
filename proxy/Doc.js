var models = require('../models');
var Doc = models.Doc;


/**
 * 新增一个文档
 * @param  {String}		htmlId 文档id 从页面上爬去得到的id
 * @param  {String}		title 文档标题	
 * @param  {String}		imgURL 文档缩略图
 * @param  {String}		desc 描述
 * @param  {String}		openURL 打开的原始地址
 * @param  {String}		gzhOpenId 公众号的openId
 * @param  {String}		sendDate 文章发布的日期格式”yyyy-MM-dd“
 * @param  {String}		sendTime 文章发布的时间”HH-mm-ss“
 * @param  {String}		typeId 类型id
 * @param  {String}		content 文档内容（包含html标签的内容）
 * @param  {Function}	callback 回调函数
 */
exports.newAndSave = function(htmlId, title, imgURL, desc, openURL, gzhOpenId, sendDate, sendTime, typeId, content, callback) {
	Doc.count({
		title: title,
		openURL: openURL
	}, function(n) {
		if (n == 0) {
			var doc = new Doc();
			doc.htmlId = htmlId;
			doc.title = title;
			doc.imgURL = imgURL;
			doc.desc = desc;
			doc.openURL = openURL;
			doc.gzhOpenId = gzhOpenId;
			doc.sendDate = sendDate;
			doc.sendTime = sendTime;
			doc.typeId = typeId;
			doc.content = content;
			doc.save(callback);
		}
	});
};