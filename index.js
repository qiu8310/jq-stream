
var isReadableStream = require('isstream').isReadable;
var JSONStream = require('JSONStream');
var es = require('event-stream');

/**
 * Parse file/url/stream
 * @param  {String|Stream}   source   可以是 url 地址，或者文件路径，或者是可读的 Stream
 * @param  {String|Array}   jsonpath  参考 http://goessner.net/articles/JsonPath/
 * @param  {Function}       callback  匹配了 jsonpath 的回调函数
 * @param  {Function}       done      读取 source 数据结束的回调函数
 */
function jq(source, jsonpath, callback, done) {

  if (typeof done !== 'function') done = noop;

  if (!isReadableStream(source) && typeof source !== 'string') throw new Error('invalid source');
  if (!jsonpath && !Array.isArray(jsonpath)) throw new Error('invalid jsonpath');
  if (!callback) throw new Error('invalid callback');

  if (isReadableStream(source)) { // stream
    read(source, jsonpath, callback, done);
  } else if (/^(https?):\/\/.+/.test(source)) { // url
    var req = require(RegExp.$1).request(require('url').parse(source), function (res) {
      read(res, jsonpath, callback, done);
    });
    req.on('error', function (e) {
      throw e;
    });
    req.end();
  } else { // file
    read(require('fs').createReadStream(source), jsonpath, callback, done);
  }
}

function read(stream, jsonpath, callback, done) {
  stream
    .pipe(JSONStream.parse(jsonpath))
    .pipe(es.mapSync(callback))
    .on('end', done);
}

function noop() {}

module.exports = jq;
