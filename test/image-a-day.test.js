var fs = require('fs');
var bunyan = require('bunyan');
var nodeunit = require('nodeunit');
var restify = require('restify');
var http = require('http');

var imageADay = require("../lib");
var bingData = require("../lib/bing-data");

// Globals

var SERVER;
var CLIENT;
var JSON_CLIENT;

// Setup

exports.setUp = function(cb) {
  var log = bunyan.createLogger({
    name: "image-a-day"
    , level: process.env.LOG_LEVEL || "debug"
    , serializers: restify.bunyan.serializers
    , stream: process.stdout
  });

  // stub fetching of xml
  var _getXml = bingData.getXml;
  bingData.getXml = function(cb) {
    cb(fs.readFileSync("./test/bing-response.xml", 'utf8'));
  };

  SERVER = imageADay.createServer({
    log: log.child({component: "server"}, true)
  });

  SERVER.listen("8081", "127.0.0.1", function() {
    CLIENT = restify.createStringClient({
      log: log.child({component: "client"}, true),
      url: SERVER.url
    });
    JSON_CLIENT = restify.createJsonClient({
      log: log.child({component: "json_client"}, true),
      url: SERVER.url,
      version: "*"
    });
    cb();
  });

};

// Teardown
exports.tearDown = function (cb) {
  CLIENT.close();
  JSON_CLIENT.close();
  SERVER.close(cb);
};

// Test behaviour

exports.testRoot = function(t) {
  CLIENT.get("/", function(err, req, res, data) {
    t.ifError(err);

    t.equal(res.statusCode, 200);
    t.equal(data, "Image A Day API");
    t.done();
  });
};

exports.testGetImage = function(t) {
  JSON_CLIENT.get("/image", function(err, req, res, obj) {
    t.ifError(err);
    t.deepEqual(obj, {
      imageUrl: "http://bing.com/az/hprichbg/rb/HawaiiPineapple_EN-US11488677220_1366x768.jpg",
      copyright: "Pineapple fields in Maui, Hawaii (© Pacific Stock - Design Pics/SuperStock)",
      copyrightLink: "http://www.bing.com/search?q=Maui%2C+Hawaii&qs=n&form=hpcapt&filters=HpDate%3a%2220130816_0700%22",
      description: "Come harvest time, these fields will produce..."
    });
    t.done();
  });
};
