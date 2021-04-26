const express = require('express');
const app = express();
const port = 3000;




//New Route
app.get('/logs/new', (req, res) => {

    res.render('new.ejs')
})




app.listen(port, () => {

    console.log('listening');
})