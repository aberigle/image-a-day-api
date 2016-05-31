var request = require("request");

function getData(cb, market) {
  // fetch raw bing xml document from url:
  if (market == undefined) {
    market = "en-US";
  }
  var bingUrl = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=" + market;
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
  getData: getData
};
