const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d455b8d1c10362a26eeb54445c362a4c&query='+ latitude + ',' +longitude + '&units=f';

    request({ url , json : true},(error, { body } = {}) => {
        if(error) {
            callback('unable to connect to the services',undefined)
        }
        else if(body.error) {
            callback('unable to find the tempreture',undefined)
        }
        else {
            const rainPrecip = body.current.precip;
            callback(undefined,'The weather is '+ body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature  + ' degree. It feels like ' +body.current.feelslike +'. The humidity is '+body.current.humidity +'%.')
            }   
    })
} 
module.exports = forecast;