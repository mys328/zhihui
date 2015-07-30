/*!
 * zhihui - app.js
 */

/**
 * Module dependencies.
 */

var config = require('./config');

if (!config.debug) {
	require('newrelic');
}
require('colors');
var eventproxy = require('eventproxy');
var path = require('path');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');
var logger = require("./common/logger");
var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var fs = require("fs");
var iconv = require('iconv-lite');
var proxy = require('./proxy')
var _ = require('lodash');
var moment = require('moment');

var typeDivId = '_subd';

var now=moment(new Date());
var sendDate=now.format('YYYY-MM-DD');


//先查询出所有的分类
proxy.DocTypeProxy.all(function(err, docTypes) {
	//console.log(docTypes);
	//抓取主页分类文章  为了不被网络屏蔽，采用读取文件的方式模拟
	fs.readFile("/Users/jwq/Downloads/搜狗微信搜索_订阅号及文章内容独家收录，一搜即达.html", function(error, fileData) {
		if (error) {
			// 出现错误
		}
		var buf = new Buffer(fileData, 'binary');
		var str = iconv.decode(buf, 'UTF-8');
		//获取当前网页的内容
		var $ = cheerio.load(str);
		//获得到所有网页内容后，根据不同分类，创建不同的Doc文章
  //http://weixin.sogou.com/pcindex/pc/pc_1/pc_1.html
		_(docTypes).forEach(function(docType) {
   var url='http://weixin.sogou.com/pcindex/pc/'+docType.htmlId+'/'+docType.htmlId+'.html';
			$("#" + docType.htmlId + typeDivId + ' li').each(function(idx, docLi) {
				var $docLi = $(docLi);
				var title = $($docLi.find('h4 a')).text();
				var imgURL = $($docLi.find('div.wx-img-box a img')).attr('src');
    var desc=$($docLi.find('a.wx-news-info')).text();
    var openURL=$($docLi.find('h4 a')).attr('href');
    var gzhOpenId=$($docLi.find('div.pos-wxrw >a')).attr('href').match(/openid=(.*)/)[1];
    var sendTime=$($docLi.find('div.s-p')).text().match(/(\d+):(\d+)/)[0]+":00";
    var typeId="";
   // console.log(docType.htmlId);
				var content = ""; //这里需要继续递归爬取具体内容
				//proxy.DocProxy.newAndSave($element.attr('id'), title, imgURL, desc, openURL, gzhOpenId, sendDate, sendTime, typeId, content);
			});
		}).value();
	});
});



// var test = function() {
// 	var cnodeUrl = 'https://cnodejs.org/';
// 	superagent.get(cnodeUrl)
// 		.end(function(err, res) {
// 			if (err) {
// 				return console.error(err);
// 			}
// 			var topicUrls = [];
// 			var $ = cheerio.load(res.text);
// 			$('#topic_list .topic_title').each(function(idx, element) {
// 				var $element = $(element);
// 				var href = url.resolve(cnodeUrl, $element.attr('href'));
// 				topicUrls.push(href);
// 			});

// 			var ep = new eventproxy();

// 			ep.after('topic_html', topicUrls.length, function(topics) {
// 				topics = topics.map(function(topicPair) {
// 					var topicUrl = topicPair[0];
// 					var topicHtml = topicPair[1];
// 					var $ = cheerio.load(topicHtml);
// 					return ({
// 						title: $('.topic_full_title').text().trim(),
// 						href: topicUrl,
// 						comment1: $('.reply_content').eq(0).text().trim(),
// 					});
// 				});

// 				console.log('final:');
// 				console.log(topics);
// 			});

// 			topicUrls.forEach(function(topicUrl) {
// 				superagent.get(topicUrl)
// 					.end(function(err, res) {
// 						console.log('fetch ' + topicUrl + ' successful');
// 						ep.emit('topic_html', [topicUrl, res.text]);
// 					});
// 			});
// 		});
// };
// test();
// setInterval(test, 600000);