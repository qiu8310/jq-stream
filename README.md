# jq-stream


## Install

```bash
npm i --save jq-stream
```

## Usage

`jq(source, jsonpath, callback, done)`

* source: Stream source, can be file, url or readable stream
* jsonpath: Path used to parse source, @see https://github.com/dominictarr/JSONStream#jsonstreamparsepath
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


