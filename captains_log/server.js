const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');



app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/captlogs', { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

//New Route
app.get('/logs/new', (req, res) => {

    res.render('new.ejs')
})
//Create Route
app.post('/logs/', (req, res) =>{

    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    res.send(req.body)

})


app.listen(port, () => {

    console.log('listening');
})