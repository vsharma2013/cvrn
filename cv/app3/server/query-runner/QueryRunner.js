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
	this.runMatchPhraseQuery(query, res);
}

QueryRunner.prototype.runMatchPhraseQuery =function(query, httpResp){
	var esQuery = this.getMathPhraseESQuery(query);
	this.client.search(esQuery, (function(err, res){
		if(err){
			logger.log(err);
			httpResp.json({success : false, results : 'error in ES query execute'});
		}
		else{
			this.onMatchPhraseResponse(res, query, httpResp);
		}
	}).bind(this));
}

QueryRunner.prototype.onMatchPhraseResponse = function(respMatchPhrase, query, respHttp){
	if(respMatchPhrase && respMatchPhrase.hits.total > 0){
		respHttp.json({
			success: true,
			count: respMatchPhrase.hits.total,
			cvs : respMatchPhrase.hits.hits
		});
	}
	else		
		this.rerunMatchPhraseQuery(query, respHttp);
}

QueryRunner.prototype.rerunMatchPhraseQuery = function(orgQuery, respHttp){
	if(orgQuery.length === 0) respHttp({success: false, message : 'No matching results found.'});

	var idx = _.lastIndexOf(orgQuery, " ");
	if(idx === -1) respHttp({success: false, message : 'No matching results found.'});

	var query = orgQuery.substr(0, idx);
	this.runMatchPhraseQuery(query, respHttp);
}

QueryRunner.prototype.getMathPhraseESQuery = function(query){
	var esQuery = {
		index: config.elasticSearch.cvIndex,
		type: config.elasticSearch.cvType,
		body: {
			query: {
				match_phrase: {
					content : query
				}
			}
		}
	};
	return esQuery;
}

QueryRunner.prototype.getQueryStringFromRequest = function(req){
	var query = decodeURIComponent(req.query.q).toLowerCase();	
	var arr = query.split(" ");
	arr = _.filter(arr, function(a){ return a.length > 0; });
	return arr.join(" ");
}

module.exports = QueryRunner;















