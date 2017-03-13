var express = require('express');
var router = require('./routers/router');
var restRouter = require("./routers/rest");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Elasticsearch = require('aws-es');

var AWSESconfig = require('./AWSESconfig.json');
elasticsearch = new Elasticsearch({
    accessKeyId: AWSESconfig.accessKeyId,
    secretAccessKey: AWSESconfig.secretAccessKey,
    service: 'es',
    region: "us-west-2",
    host: AWSESconfig.host
});

// twiter streaming API
var Twitter = require('ntwitter');
var config = require('./config.json');
var twitter = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.token,
    access_token_secret: config.token_secret
});

app.use('/', router);

app.use('/api/v1', restRouter);

io.on('connection', function(socket){

	twitter.stream('statuses/sample', function(stream) {
	    stream.on('data', function (data) {

	        if (data.geo != null) {
	            console.log(data.geo);
	            var tweet = {
	            	user: data.user.screen_name,
	            	content: data.text,
	            	latLng: {
	            		lat: data.geo.coordinates[0],
	            		lng: data.geo.coordinates[1]
	            	}
	            };

	            //store to AWS ES
	            elasticsearch.index({
				    index: 'twiter',
				    type: 'tweets',
				    body: {
				        user: data.user.screen_name,
		            	content: data.text,
		            	lat: data.geo.coordinates[0],
		            	lng: data.geo.coordinates[1]
				    }
				}, function(err, data) {
				    if (err) {
				      console.log(err);
				    } else {
				      console.log('tweet with geo has been stored into AWS ES');
				    }
				});

	            socket.emit('point', tweet);
	        }
	    });
	});

});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
