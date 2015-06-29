var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')('localhost/election_results');
var results2012 = db.get('results2012');
var results2010 = db.get('results2010');
var results2008 = db.get('results2008');
var results2006 = db.get('results2006');
var results2004 = db.get('results2004');
var results2002 = db.get('results2002');
var districts = db.get('districts');
// Input Page with Data Gathering

// Render the Input Page
router.get('/input', function (req, res, next) {
  res.render('input');
});
// Render the Results Page
router.get('/results', function (req, res, next) {
  res.render('results');
});
// Retrieve User Input and Search DBS
router.post('/input', function (req, res, next) {
  var zipIN = req.body.zip;
  var yearIN = 'results' + req.body.years;
  districts.find({zip: parseInt(zipIN)}, function (err, data) {
    var state = data[0].state;
    if(String(data[0].district).length === 1)
      var district = '0' + data[0].district;
    else
      var district = data[0].district;
    var yrDB = db.get(yearIN);
    // console.log(district)
    yrDB.find({state: state, district: district}, function (err, data) {
      var candidates = [];
      for(var i = 0; i < data.length; i++) {
        var info = {};
        info.name = data[i].name;
        info.percent = data[i].votePercent;
        candidates.push(info);
        // console.log(info);
      }
      console.log(candidates);
      res.render('results', {info: candidates});

    });
  });
});


module.exports = router;
