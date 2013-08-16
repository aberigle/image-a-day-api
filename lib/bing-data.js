//var request = require("request");

function getXml() {
  // fetch raw bing xml document from url:
  var bingUrl = "http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US";
  //request({uri: bingUrl}, function(err, res, body) {
  //  // TODO: handle err and res.code !== 200
  //  return body;
  //});
  return bingUrl;
}

//--- Exports

module.exports = {
  getXml: getXml
};
