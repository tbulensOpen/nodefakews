var _und = require("underscore");
var YAML = require('yamljs');

var config = YAML.load('../fakeWsConfig.yml');

var result = matchUrl(config.urlMappings, 'http://localhost:8080/hello');
console.log('resultExactMatch = ' + result.url);

var result1 = matchUrl(config.urlMappings, 'http://localhost:8080/help');
console.log('resultWildCard = ' + result1.url);

function matchUrl(urls, requestUrl) {
  
  var match = _findMatch(urls, requestUrl);
  if (match) return match;
  
  return _findWildCardMatch(urls, requestUrl);
};

function _findMatch(urls, requestUrl) {
   var urlFnd = _und.findWhere(urls, {url: requestUrl});
   return (urlFnd) ? urlFnd : undefined;
};

function _urlContains(urls, requestUrl) {
    var isMatch = function(url) {
	   var patt = new RegExp(url.url, 'i');
	   
       if(requestUrl.match(patt)){ 
         console.log("HELLLOOOO " + url.url);	
         results.push(url);		 
         return url;
       };
	};
	
	var results = [];
   _und.each(urls, isMatch, results); 
   return results; 
};

function _findWildCardMatch(urls, requestUrl) {
  var replaceWildCard = function(url) {
	 url.url = url.url.replace("*", "");
     return;
  };
  _und.each(urls, replaceWildCard); 
  
  
  console.log("AAA = " + urls);
  
  return _urlContains(urls, requestUrl);
};