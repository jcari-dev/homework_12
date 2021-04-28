//Mostly Setup Stuff

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Logs = require('./models/logs.js');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')


// import LogsController from '.controllers/logs.js'

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());

// Mongo Stuff

mongoose.connect('mongodb://localhost:27017/captlogs', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})



// Index Route

app.get('/logs', (req, res) => {

    Logs.find({}, (error, allLogs) => {
        res.render('index.ejs', {
            logs: allLogs

        });
    })
});



// New Route

app.get('/logs/new', (req, res) => {

    res.render('new.ejs');
})


// Edit Route

app.get('/logs/:id/edit', (req, res) => {
    Logs.findById(req.params.id, (err, logsFound) => {
        res.render('edit.ejs', {
            logs: logsFound
        });
    });
});

// Put Request

app.put('/logs/:id', (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Logs.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, updatedLog) => {

        res.redirect('/logs/')
    })
});

// Show Route
// app.get('/logs/:id', (req, res) => {

//         Logs.find({}, (error, getLog) => {
//             res.render('show.ejs', {
//                 logs: getLog[req.params.id]
//             })
//         })
//     })
app.get('/logs/:id', (req, res) => {
    //console.log(Logs.title,Logs)
    Logs.find({}, (err, logsFound) => {
        res.render('show.ejs', {
            logs: logsFound[req.params.id]
        })
    })
})



// Delete Route 

app.delete('/logs/:id', (req, res) => {
    Logs.findOneAndDelete({ _id: req.params.id }, (err, deletedLogs) => {
        res.redirect('/logs');
    })
});

// Create Route

app.post('/logs/', (req, res) => {

    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Logs.create(req.body, (error, createdLogs) => {
        res.redirect('/logs');
    })


});



//Listening Check

app.listen(port, () => {

    console.log('listening');
})