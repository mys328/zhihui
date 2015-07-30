var models = require('../models');
var GZH = models.GZH;

/**
 * 新增一个公众号
 * @param  {String}		imgURL 公众号的图标地址
 * @param  {String}		openId 公众号的openid
 * @param  {String}		name 公众号的名字
 * @param  {Boolean}	isV 公众号是否认证
 * @param  {String}		company 认证公司
 * @param  {String}		code 公众号的微信号
 * @param  {String}		desc 公众号的功能介绍
 * @param  {Number}		userNum 公众号的粉丝数量
 * @param  {Function}	callback 回调函数
 */
exports.newAndSave = function(imgURL,openId,name,isV,company,code,desc,userNum, callback) {
	var gzh = new GZH();
	gzh.imgURL=imgURL;
	gzh.openId=openId;
	gzh.name=name;
	gzh.isV=isV;
	gzh.company=company;
	gzh.code=code;
	gzh.desc=desc;
	gzh.userNum=userNum;
	gzh.save(callback);
};