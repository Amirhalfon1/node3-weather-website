const request = require('request')

const forecast = (lat,lon,callback) =>{
    const url = 'https://api.darksky.net/forecast/0f27021b81ae58da6842ed4a6ccad5c2/' + lat + ',' + lon + '?units=si';
    request({url, json : true} , (error, {body}) => {
    if(error){
        callback('Unable to connect to weather service',undefined)
    }
    else if(body.error){
        callback(rbody.error,undefined)
    }else{
        const summary = body.daily.data[0].summary
        const temperature = body.currently.temperature
        const precipProbability = body.currently.precipProbability
        const minTemp = body.daily.data[0].temperatureMin
        const maxTemp = body.daily.data[0].temperatureMax
        callback(undefined,summary + ' the temperature is ' + temperature + 
                ' degrees out and rain probabilty is ' + precipProbability + '%\n The minimum temperature during the day is ' + minTemp + 
                '° and the maximum temperature is ' + maxTemp+ '°')
    }
})
}

module.exports = forecast;