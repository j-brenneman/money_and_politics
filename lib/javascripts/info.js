// fec [candidate, vote %, votes, party]
var yr2002 = require('./elections/2002.json');
var yr2004 = require('./elections/2004.json');
var yr2006 = require('./elections/2006.json');
var yr2008 = require('./elections/2008.json');
var yr2010 = require('./elections/2010.json');
var yr2012 = require('./elections/2012.json');
// sunlightLabs bulk download [zip, districts, state]
var zipDistricts = require('./elections/districts.json');
// [year, candiate] --> sunlightLabs [fec_id] ---> [net $, pic, bio, top-donors]
var sunlightLabs = require('./lib/javascripts/sunlightLabs');

// push every piece of info to array and with most deeply nested for loop,
// check the array length with number of items given to array before execution
