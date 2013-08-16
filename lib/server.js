var restify = require("restify");
var assert = require("assert-plus");
var path = require("path");
var bingData = require("./bing-data");
var libxmljs = require("libxmljs");

///--- Handlers

function getImage(req, res, next) {
  var bingXml = bingData.getXml();

  // parse xml
  var xmlDoc = libxmljs.parseXml(bingXml);
  var response = {};
  response.imageUrl = "http://bing.com" + xmlDoc.get("//url").text();
  response.copyright = xmlDoc.get("//copyright").text();
  response.copyrightLink = xmlDoc.get("//copyrightlink").text();
  response.description = xmlDoc.get("//desc").text();

  res.send(200, response);
  return next();
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
