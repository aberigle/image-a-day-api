var request = require("request");

function getXml(cb) {
  // fetch raw bing xml document from url:
  var bingUrl = "http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US";
  request({uri: bingUrl}, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      cb(body);
    } else {
      cb(undefined);
    }
  });
}

//--- Exports

module.exports = {
  getXml: getXml
};
