const request = require('request')
require('dotenv').config()



const geocode = (address, callback) =>{
	const api_key = process.env.API_KEY
	const weather_url =( 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=' + api_key)
	request({url: weather_url, json: true}, (error, {body}) =>{
		if (error) {
			callback('Unable to connect to location services')
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search')			
		} else {
			console.log(body.features)
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}



module.exports =  geocode
