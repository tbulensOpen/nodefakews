var YAML = require('yamljs');
var http = require('http');

var redis = require("redis"),
    client = redis.createClient();

// Load yaml file using YAML.load 
var config = YAML.load('fakeWsConfig.yml');
var prop = YAML.load('fakeWsEnv.yml');

console.log(config.urlMappings);
console.log(prop.urlMappingMissing);



client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});


http.createServer(function (req, res) {
 

  var urlParam = req.url;
  if (urlParam !== '/favicon.ico') {
     console.log("url = " + urlParam);

     client.set(urlParam, urlParam);
     client.get(urlParam, function(err, reply) {
          console.log("redis value = " + reply);
     });
  };
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');