module.exports = function (input, year, amount) {

  var unirest = require('unirest');
  var key = process.env.SUNLIGHTLABS;
  for (var i = 0; i < input.length; i++) {
    var temp = input[i].name
               .split(' ');
    if(temp.length === 3)
      var name = temp[0] + '+' + temp[2];
    else
      var name = temp[0] + '+' + temp[1];

    // console.log(name);
    unirest.get('http://transparencydata.org/api/1.0/entities.json?apikey=' + key + '&search=' + name + '&type=politician')
    .end(function (response) {
      var politicalId = response.body[0].id;
      unirest.get('http://transparencydata.com/api/1.0/entities/' + politicalId + '.json?apikey=' + key)
      .end(function (response2) {
        console.log(response2.body.totals[year].recipient_amount);
        amount(response2.body.totals[year].recipient_amount);
      });
    });
  }
}
