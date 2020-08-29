const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e0bd61139ae4f65036fb7c55394bb2b&query=' + latitude + ',' + longitude + '&units=m'
    
    request({ url, json:true }, (error, { body }={}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            const forecastString = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '% and the UV Index is ' + body.current.uv_index + ' .'
            callback(undefined, forecastString)
        }    
    })
}

module.exports = forecast


// //{
//     description: response.body.current.weather_descriptions[0],
//     temperature: response.body.current.temperature,
//     feels_like: response.body.current.feelslike
// }