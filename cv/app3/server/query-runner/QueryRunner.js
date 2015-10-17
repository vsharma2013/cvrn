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

QueryRunner.prototype.run = function(){
	
}

module.exports = QueryRunner;















