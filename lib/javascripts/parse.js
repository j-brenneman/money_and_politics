var db_insert = function () {

  var db = require('monk')('localhost/election_results');
  // Zip Code Mongo Insert
  var districts = db.get('districts');
  var zipDistricts = require('./elections/districts.json');
  for (var i = 0; i < zipDistricts.length; i++) {
    var zip = parseInt(zipDistricts[i].zip);
    districts.insert({zip: zip, state: zipDistricts[i].state, district: zipDistricts[i].district});
  }
  // Election Results Mongo Insert
  // var results2012 = db.get('results2012');
  // var results2010 = db.get('results2010');
  // var results2008 = db.get('results2008');
  // var results2006 = db.get('results2006');
  // var results2004 = db.get('results2004');
  // var results2002 = db.get('results2002');
  //
  // var yr2002 = require('./elections/2002.json');
  // var yr2004 = require('./elections/2004.json');
  // var yr2006 = require('./elections/2006.json');
  // var yr2008 = require('./elections/2008.json');
  // var yr2010 = require('./elections/2010.json');
  // var yr2012 = require('./elections/2012.json');
  //
  //
  // var election_results = [results2002, results2004, results2006, results2008, results2010, results2012];
  // var fec_data = [yr2002, yr2004, yr2006, yr2008, yr2010, yr2012];
  // // console.log(fec_data[0].length);
  // for (var i = 0; i < fec_data.length; i++) {
  //   var dbyr = election_results[i];
  //   var rawData = fec_data[i];
  //   for (var j = 0; j < rawData.length; j++) {
  //     if(rawData[j].GENERAL_PERCENT && rawData[j].Last != 'Scattered')
  //       dbyr.insert({name: rawData[j].First + " " + rawData[j].Last, state: rawData[j].STATE_ABRV, district: rawData[j].DISTRICT, voteTotal: rawData[j].GENERAL_VOTES, votePercent: rawData[j].GENERAL_PERCENT});
  //   }
  // }

}

db_insert();
