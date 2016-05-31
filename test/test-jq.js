var jq = require('../index');

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var http = require('http');

var sourceFile = path.join(__dirname, 'byField.json');

describe('jq', function () {
  it('should parse remoute http source', function (done) {

    var app = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(fs.readFileSync(sourceFile).toString());
      res.end();
    });
    app.listen(9873);

    testSource('http://localhost:9873', function (err) {
      app.close();
      done(err);
    });
  });

  it('should parse local file', function (done) {
    testSource(sourceFile, done);
  });

  it('should parse readable stream', function (done) {
    var stream = fs.createReadStream(sourceFile);
    testSource(stream, done);
  });
});


function testSource(source, done) {
  var names = getSourceNames();
  jq(source, 'rows.*.value', function(pkg) {
    assert.equal(pkg.name, names.shift());
  }, function() {
    assert.equal(names.length, 0);
    done();
  });
}


function getSourceNames() {
  return [
    'abstract-blob-store',
    'abstract-chunk-store',
    'abstract-chunk-transport',
    'abstract-class-harmony',
    'abstract-command'
  ];
}
