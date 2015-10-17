var elasticsearch = require('elasticsearch');
var config = require('./../../config/config');
var logger = require('./../utils/Logger');
var _ = require('underscore');

function QueryRunner(){
	this.init();
}

QueryRunner.prototype.init = function(){
	this.client = new elasticsearch.Client({
		host: config.elasticSearch.url,
		requestTimeout : 1000 * 60 *5
	});
}

QueryRunner.prototype.run = function(req, res){
	var query = this.getQueryStringFromRequest(req);
	res.json({status : 'query executed in runner'});
}

QueryRunner.prototype.getQueryStringFromRequest = function(req){
	var query = decodeURIComponent(req.query.q).toLowerCase();	
	var arr = query.split(" ");
	arr = _.filter(arr, function(a){ return a.length > 0; });
	return arr.join(" ");
}

module.exports = QueryRunner;















