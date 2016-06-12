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


