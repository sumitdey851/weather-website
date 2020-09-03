//importing npm(s)
const path = require('path')
const express = require('express')
const hbs = require('hbs')  //Handlebars is a simple templating language.

//importing own modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Create an Express application
const app = express()
const port = process.env.PORT || 3000   //using environment variable PORT to tell heroku what port to listen on


//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views/partials location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {     //renders the index.hbs view
    res.render('index', {
        title: 'Weather',
        name: 'Sumit Dey'
    })
})

app.get('/about', (req, res) => {   //renders about.hbs view
    res.render('about', {
        title: 'About',
        name: 'Sumit Dey'
    })
})

app.get('/help', (req, res) => {    //renders help.hbs view
    res.render('help', {
        helpText: 'Version 1.8',
        title: 'Help',
        name: 'Sumit Dey'
    })
})

app.get('/weather', (req, res) => {
    //enforce an address query, all queries are received in req
    const address = req.query.address   //getting the address from req object
    if(!address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, {latitude, longitude, location}={}) => {   //getting geocode
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {    //getting forecast data
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecastData: forecastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {  //for urls that contain anything typed after /help/
    res.render('404', {
        title: 'Error 404!',
        errorMessage: 'Help article not found!',
        name: 'Sumit Dey'
    })
})

app.get('*', (req, res) => {    //for all urls except those defined in this file
    res.render('404', {
        title: 'Error 404!',
        errorMessage: 'Page not found!',
        name: 'Sumit Dey'
    })
})

app.listen(port, () => {    //Binds and listens for connections on the specified host and port.
    console.log('Server is up on port ' + port)
})