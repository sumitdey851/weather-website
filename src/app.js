const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Create an Express application
const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sumit Dey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sumit Dey'
    })
})

app.get('/help', (req, res) => {
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

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        errorMessage: 'Page not found!',
        name: 'Sumit Dey'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})