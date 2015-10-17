var config = {
	logger : {
		logDir : './server/log/',
		logFileName : './server/log/app.log'
	},
	elasticSearch : {
		url : 'http://localhost:9200/',
		cvIndex : 'cvs',
		cvType : 'cv'
	},
	cv : {
		rootDir : '/Users/vishal/work/CV_OUT/'
	}
};


module.exports = config;