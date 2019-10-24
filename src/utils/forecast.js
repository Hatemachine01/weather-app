const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = ('https://api.darksky.net/forecast/701e1a19d36591db5087b9bbffddb1c9/' + latitude + ',' + longitude + '?lang=es')
	request({url, json: true}, (error, { body} ) =>{
		if (error){
			callback("Unable to connect to the internet")
		} else if (body.error) {
			console.log(body.error)
			callback("Unable to find location" , undefined)
		} else {
			callback(undefined, `Curren temp =  ${body.currently.temperature}` + ` and ${body.currently.precipProbability}% chance of rain `  + `summary: ${body.daily.data[0].summary}`)
		}
	})
}

module.exports = forecast