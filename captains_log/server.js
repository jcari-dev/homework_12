//Mostly Setup Stuff
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Logs = require('./models/logs.js');
app.use(express.urlencoded({extended:true}));
// Mongo Stuff
mongoose.connect('mongodb://localhost:27017/captlogs', { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

//New Route
app.get('/logs/new', (req, res) => {

    res.render('new.ejs');
})
//Create Route
app.post('/logs/', (req, res) =>{

    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Logs.create(req.body, (error, createdLogs) =>{
        res.send(req.body);
    });

});

//Index Route
app.get('/logs', (req, res) => {
res.send('index'); 	
});



app.listen(port, () => {

    console.log('listening');
})