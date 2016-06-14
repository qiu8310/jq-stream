# jq-stream

[![NPM version](https://badge.fury.io/js/jq-stream.svg)](https://npmjs.org/package/jq-stream)
[![Build Status](https://travis-ci.org/qiu8310/jq-stream.svg?branch=master)](https://travis-ci.org/qiu8310/jq-stream)


## Install

```bash
npm i --save jq-stream
```

## Usage

`jq(source, jsonpath, callback, done)`

* source: Stream source, can be file, url or readable stream
* jsonpath: Path used to parse source, @see https://github.com/dominictarr/JSONStream#jsonstreamparsepath and http://goessner.net/articles/JsonPath/
* callback: Called on each match jsonpath
* done: Called on parsed

## Example

```js
var jq = require('jq-stream');

jq(
  '/path/to/file', 
  'rows.*', 
  function (row) { 
    /* process */
  }, 
  function done() {}
);

```

## Articles about stream

* [Why I don't use Node's core 'stream' module](https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html)
* [Stream handbook](https://github.com/substack/stream-handbook)

## TODO

* [ ] __NO NEED__ to use `event-stream`
* [ ] __NEED__ something like this:

  ```js
  jq('/path/to/file')
    // "total_rows" property is on the top of the file,
    // so we can get the total_rows first and then display 
    // a progress bar on "row.*" iterator.
    .on('total_rows', function (total) { /* ... */ })
    .on('rows.*',     function ( row ) { /* ... */ })
    .end(  function (   ) { /* ... */ }) // optional
    .error(function (err) { /* ... */ }) // optional
    .run();
  ```

* [ ] __COLLECT__ stream parser: `jsonparse`, `csv2`
