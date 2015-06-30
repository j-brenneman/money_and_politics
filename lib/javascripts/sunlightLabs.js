module.exports = function (rep, year, i, percent, amount) {
  // console.log(percent);
  var unirest = require('unirest');
  var key = process.env.SUNLIGHTLABS;

    var temp = rep
               .split(' ');
    if(temp.length === 3)
      var name = temp[0] +'+'+ temp[1] +'+'+ temp[2];
    else
      var name = temp[0] + '+' + temp[1];

    // console.log(name);
    unirest.get('http://transparencydata.org/api/1.0/entities.json?apikey=' + key + '&search=' + name + '&type=politician')
    .end(function (response) {
      // console.log(response.body[0]);
      if(response.body[0]) {
        var politicalId = response.body[0].id;
        unirest.get('http://transparencydata.com/api/1.0/entities/' + politicalId + '.json?apikey=' + key)
        .end(function (response2) {
          console.log(response2.body);
          if(response2.body.totals[year])
            amount(response2.body.totals[year].recipient_amount, rep, percent, response2.body.metadata.photo_url);
          else
            amount('Information not Available', rep, percent, response2.body.metadata.photo_url);
        });
      }
      else
        amount('Information not Available', rep, percent, 'not available');

    });

}
