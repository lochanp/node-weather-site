const path  = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();
const port =process.env.PORT || 3000;

//define paths for exprss config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templetes/views')
const partialsPath = path.join(__dirname,'../templetes/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static direstory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        name :' Lochan Potdar',
        title: 'Weather'
    })  
})
app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : ' Lochan Potdar',

    })
})
app.get('/jelp',(req,res) => {
    res.render('jelp',{
        title : 'Help',
        name : ' Lochan Potdar'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude,longitude,location } = { }) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude,longitude,(error, forecastData) =>  {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            });
        });
    }); 
})
app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error : 'Please enter a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/jelp/*',(req,res) => {
    res.render('error',{
        title: '404 help',
        name : ' Lochan Potdar',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title : '404',
        name: ' Lochan Potdar',
        errorMessage : 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is running on '+port)
})