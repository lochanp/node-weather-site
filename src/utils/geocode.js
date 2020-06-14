const request = require('postman-request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibG9jaGFucG90ZGFyIiwiYSI6ImNrYXhuYTJ6YjA1dXoyeHA2bTRvcWEzd3cifQ.ICxbzZ0N3PRwvqNi4CqUZw&limit=1';
    request({ url ,json : true },(error , { body } = { }) => {
        if(error) {
            callback('unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find the location try again please!', undefined);
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;