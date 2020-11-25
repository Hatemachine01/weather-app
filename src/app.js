const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path')
require('dotenv').config()


console.log(__dirname)
console.log(path.join(__dirname,"../public"))
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//ssetup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

//setup static directory to serve

app.use(express.static(publicDirectoryPath))


// routes

app.get('/', (req, res)=> {
	res.render('index', {
		title: "Vasquez",
		name: 'julio'

	})
})

app.get('/about', (req, res)=> {
	res.render('about', {
		title: "Vasquez",
		name: 'julio'

	})
})


// app.use('/help',express.static(publicDirectoryPath))
app.get('/help', (req, res)=> {
	res.render('help', {
		title: "HELP!",
		message: "This is not a drill. Help is needed"
	})
})

app.get('/weather', (req, res)=> {
	console.log(req.query)
	if (!req.query.location){
			return res.send({
				error: 'you must provide a location'
			})
	}
	
	geocode(req.query.location,(error,{latitude, longitude, location}={}) =>{
			if (error){
				return res.send({ error })
			}

			forecast(latitude, longitude, (error,forecastData) => {
				if (error){
				return res.send({error })
				}
		

				res.send({
				location:  location,
				forecast: forecastData
			})	
		})
	})
})


	



// app.get('/products', (req, res)=> {
// 	if (!req.query.search){
// 			return res.send({
// 				error: 'you must provide a search term'
// 			})
// 	}
// 	res.send({
// 		name: 'julio',
// 		location: 'oregon'
// 	})
// })

app.get('/help/*',(req,res)=>{
		res.render('404')
})

app.get('*', (req,res)=>{
	res.render('404', {
		name: 'julio',
		res: res
	}) 
})

app.listen(port , () => {
	console.log("Server is running on port" + port)
})
