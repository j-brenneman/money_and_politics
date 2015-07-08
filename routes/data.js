var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var sunlightLabs = require('./../lib/javascripts/sunlightLabs');
var db = require('monk')('localhost/election_results');
var zips = require('./../elections/districts.json');
var results2012 = db.get('results2012');
var results2010 = db.get('results2010');
var results2008 = db.get('results2008');
var results2006 = db.get('results2006');
var results2004 = db.get('results2004');
var results2002 = db.get('results2002');
var yrsDB = [results2002, results2004, results2006, results2006, results2008, results2010, results2012];
// Retrieve Info from DB and API and build final DB
var result = [];

for (var n = 0; n < zips.length; n++) {
  var state = zips[n].state;
  if(String(zips[n].district).length === 1) {
    var district = '0' + zips[n].district;
  } else {
    var district = String(zips[n].district);
  }
  var zip = zips[n].zip
  console.log(state, district, zip);
  for (var z = 0; z < yrsDB.length; z++) {
    var yrDB = db.get(yrsDB[z]);
    yrDB.find({state: state, district: district}, function (err, datas) {
      console.log(datas);
      for(var i = 0; i < datas.length; i++) {
        var percent = datas[i].votePercent;
        sunlightLabs(datas[i].name, year, i, percent, function (reciepts, name, vote, photo, bio) {
          var info = {};
          if(reciepts === 'Information not Available')
            var contributions = reciepts;
          else
            var contributions = '$' +' '+ reciepts.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          if(photo === 'not available' || photo === undefined || photo === '' )
            var pic = 'Picture Unavailable';
          else
            var pic = photo;

          info.candidate = name;
          info.reciepts = contributions;
          info.percent = vote;
          info.photo = pic;
          info.bio = bio;
          result.push(info);
          console.log(result);
        });
      }
    });
  }
}



module.exports = router;
