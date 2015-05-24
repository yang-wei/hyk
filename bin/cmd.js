#!/usr/bin/env node

require("babel/register");

/**
 * Module dependencies
 */
var hyk = require('../lib');
var source = require('../lib/api_source');
var wordArg = process.argv[2];

hyk(wordArg, source);
