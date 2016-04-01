var restify = require("restify");
var assert = require("assert-plus");
var path = require("path");
var bingData = require("./bing-data");
var libxmljs = require("libxmljs");

///--- Handlers

function getImage(req, res, next) {

  bingData.getXml(function(bingXml) {
    var response = {};
    // parse xml
    if (bingXml === undefined) {
      response.error = "Something went wrong fetching data from Bing";
    } else {
      var xmlDoc = libxmljs.parseXml(bingXml);
      response.imageUrl = "http://bing.com" + xmlDoc.get("//url").text();
      var chunk;
      response.copyright     = (chunk = xmlDoc.get("//copyright")? chunk.text(): '');
      response.copyrightLink = (chunk = xmlDoc.get("//copyrightlink")? chunk.text(): '');
      response.description   = (chunk = xmlDoc.get("//desc")? chunk.text(): '');
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send(200, response);
    return next();
  });
}

///--- API

function createServer(options) {
  assert.object(options, 'options');
  assert.object(options.log, 'options.log');

  // create server with logger
  var server = restify.createServer({
    log: options.log
    , name: "image-a-day"
    , version: "0.0.1"
  });

  // parse query parameters maybe later
  // server.use(restify.queryParser());

  // API endpoints
  server.get("/image",getImage);

  // default '/' handler
  server.get("/", function root(req, res, next) {
    res.send(200, "Image A Day API");
    next();
  });

  return server;
}

///--- Exports

module.exports = {
  createServer: createServer
};
