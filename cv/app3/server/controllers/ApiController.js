var logger = require('./../utils/Logger');
var QueryRunner = require('./../query-runner/QueryRunner');
var IndexBuilder = require('./../index-builder/IndexBuilder');

function ApiController(){

}


ApiController.prototype.handleCreateIndexRequest = function(req, res){	
	new IndexBuilder().build();
	res.json({status : "Index creation started, please check logs"})
}

ApiController.prototype.handleSearchRequest = function(req, res){	
	new QueryRunner().run(req, res);
}

var gApiController = new ApiController();

module.exports = gApiController;