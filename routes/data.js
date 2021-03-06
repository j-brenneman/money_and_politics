var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var sunlightLabs = require('./../lib/javascripts/sunlightLabs');
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/election_results');
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
  var zipIN = req.body.zip.trim();
  if(zipIN.length < 5 || zipIN.length > 5) {
    res.render('input', {error: 'Please enter a Valid Zipcode'})
  } else {
    var yearIN = 'results' + req.body.years;
    var year = req.body.years;
    districts.find({zip: parseInt(zipIN)}, function (err, data) {
      var state = data[0].state;
      if(String(data[0].district).length === 1)
        var district = '0' + data[0].district;
      else
        var district = data[0].district;
      var yrDB = db.get(yearIN);
      yrDB.find({state: state, district: district}, function (err, datas) {
        if(datas[0]) {
          var result = [];
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
              if(result.length === datas.length)
                res.render('results', {info: result, state: state, district: district, year: year});

            });
          }
        }
        else {
          var message = 'Sorry but' +' '+ zipIN +' '+ 'currently represents' +
                        ' '+ state +' '+ district +','+' '+ 'which did not exist in' +' '+ year;
          res.render('input', {response: message});
        }
      });

    });
  }
});


module.exports = router;
