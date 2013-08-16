var bunyan = require("bunyan");
var getopt = require("posix-getopt");
var restify = require("restify");

var imageADay= require("./lib");

///--- GLOBALS

var LOG = bunyan.createLogger({
  name: "Image a day API"
  , streams: [
    {
      level: (process.env.LOG_LEVEL || "info")
      , stream: process.stderr
    }
    , {
      level: "debug"
      , type: "raw"
      , stream: new restify.bunyan.RequestCaptureStream({
        level: bunyan.WARN
        , maxRecords: 100
        , maxRequestIds: 1000
        , stream: process.stderr
      })
    } ]
  , serializers: restify.bunyan.serializers
});

///--- Helpers

/**
 * Standard POSIX getopt-style options parser.
 *
 * node main.js -p 80 -vv 2>&1 | bunyan
 *
 * Will set the log level to TRACE.
 */
function parseOptions() {
  var option;
  var opts = {};
  var parser = new getopt.BasicParser('hv:p:u:', process.argv);

  while ((option = parser.getopt()) !== undefined) {
    switch (option.option) {
      case 'h':
        usage();
        break;
      case 'u':
        opts.user = option.optarg;
        break;
      case 'p':
        opts.port = parseInt(option.optarg, 10);
        break;
      default:
        usage('invalid option: ' + option.option);
        break;
    }
  }

  return opts;
}

function usage(msg) {
  if (msg)
    console.error(msg);

  var str = "usage: node main.js [-v] [-u user] [-p port]";
  console.error(msg);
  process.exit(msg ? 1 : 0);
}

///--- Main

(function main() {
  var options = parseOptions();

  LOG.debug(options, 'arguments passed');

  var server = imageADay.createServer({
    log: LOG
  });

  server.listen((options.port || 9090), function whenStarted() {
    LOG.info("Listening at %s", server.url);
  });
})();
