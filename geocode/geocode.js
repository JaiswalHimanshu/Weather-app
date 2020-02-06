const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=3cd79638e6ad4060b6d96f54d984483b`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.total_results === 0) {
      callback('Unable to find that address.');
    } else if (body.status.message === 'OK') {
      console.log(body.results[0].formatted);
      callback(undefined, {
        address: body.results[0].components.city_district,
        latitude: body.results[0].bounds.northeast.lat,
        longitude: body.results[0].bounds.northeast.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
