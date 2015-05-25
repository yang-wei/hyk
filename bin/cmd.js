#!/usr/bin/env node
/**
 * Module dependencies
 */
var fs = require('fs');

// in development, we write code in 
// src directory instead of lib
var hyk = require('../lib');
var source = require('../lib/api_source');

var wordArg = process.argv[2];

if(!wordArg) {
  fs.readFile(__dirname + '/help.txt', 'utf8', function(err, data) {
    if(err) throw err;
    console.log(data);
    process.exit(1);
  }); 
}

hyk(wordArg, source);
