var cluster = require('cluster');

if (cluster.isMaster) {
	// Source from: http://rowanmanning.com/posts/node-cluster-and-express/
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    console.log('cpuCount %d', cpuCount);
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
	var express = require('express');
	var app = express();

	app.get('/', function (req, res) {
    	res.send('Hello World!');
	});

	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
		console.log('Worker %d running!', cluster.worker.id);
	});
}
