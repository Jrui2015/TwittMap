var Elasticsearch = require('aws-es');

var AWSESconfig = require('../AWSESconfig.json');
elasticsearch = new Elasticsearch({
    accessKeyId: AWSESconfig.accessKeyId,
    secretAccessKey: AWSESconfig.secretAccessKey,
    service: 'es',
    region: "us-west-2",
    host: AWSESconfig.host
});

var getTweetsWithKeyword = function(keyword, callback) {
	// get tweets
	elasticsearch.search({
	    index: 'twiter',
	    type: 'tweets',
	    body: {
	        query: {
	            query_string: {
	                query: keyword
	            }
	        }
	    }
	}, function(err, tweets) {
		if (err) {
			console.log(err);
		} else {
			callback(tweets.hits.hits);
		}
	});
};

module.exports = {
	getTweetsWithKeyword: getTweetsWithKeyword
};