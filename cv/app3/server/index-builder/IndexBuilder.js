var elasticsearch = require('elasticsearch');
var request = require('request');
var fs = require('fs');
var config = require('./../../config/config');
var esConfig = config.elasticSearch;
var logger = require('./../utils/Logger');

function IndexBuilder(){
	this.client = new elasticsearch.Client({
		host: esConfig.url,
		requestTimeout : 1000 * 60 *5
	});
	this.id = 1;
}

IndexBuilder.prototype.build = function(){
	var rootDir = config.cv.rootDir;
	var cvs = [];
	for(var i = 1; i <= 3272; i++){
		var fName = 'r' + i + ".txt"
		cvs.push({
			name : fName,
			content : fs.readFileSync(rootDir + fName , "utf8").toString()
		});
	}
	this.createIndex(cvs);
}

IndexBuilder.prototype.createIndex = function(cvs){
	this.deleteIndex((function(result){
		if(!result){
			res.json({success: false, message: 'failed to delete index'});
			return;
		}

		this.createNewIndex(cvs);
	}).bind(this));
}

IndexBuilder.prototype.deleteIndex = function(cbOnDelete){
	var options = {
		index: esConfig.cvIndex,
  		ignore: [404]
	};

	function deleteSuccess(){
		logger.log("deleted indices successfully : " + esConfig.cvIndex);
		cbOnDelete(true);
	}

	function deleteError(err){
		cbOnDelete(false);
	}

	this.client.indices.delete(options).then(deleteSuccess, deleteError);
}

IndexBuilder.prototype.createNewIndex = function(cvs){
	var options = {
		url : esConfig.url + esConfig.cvIndex,
		method : 'PUT',
	}; 
	request(options, (function(err, req, body){
		if(err){
			resHttp.json({success: false, message: 'error in creating index'});
			return;
		}
		var data = JSON.parse(body);
		if(data.acknowledged){
			logger.log('created index successfully');
			this.addTypesToIndex(cvs);
		}
	}).bind(this));
}

IndexBuilder.prototype.addTypesToIndex = function(cvs){
	var self = this;
	var bulkQuery = {body : []};
	cvs.forEach(function(sDoc){
		bulkQuery.body.push({
			index: {
				_index : esConfig.cvIndex,
				_type : esConfig.cvType,
				_id : self.id
			}
		});

		bulkQuery.body.push(sDoc);
		++self.id;

	});

	this.client.bulk(bulkQuery, function (err, resp) {
		if(err){
			logger.log(err);
			return;
		}
		logger.log('created types successfully');
	});
}


module.exports = IndexBuilder;