const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather App',
        name: 'Amir Halfon'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About me',
        name: 'Amir Halfon'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        message : 'This is an important message',
        title : 'Help Page',
        name: 'Amir Halfon'
    })
})


app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({error : 'You must provide an address'})
    }
    const address = req.query.address
    geocode(address,(error,{latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error : error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error : error})
            }
            res.send({
                forecast : forecastData,
                location,
                address
            })
          })
    })

})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        errorMessage : 'Help Article not found',
        title : '404',
        name: 'Amir Halfon'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        errorMessage : 'Page not found',
        title : '404',
        name: 'Amir Halfon'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})