const Logs = require('./models/logs.js');

exports.index_route = (req, res) => {

    Logs.find({}, (error, allLogs) => {
        res.render('index.ejs', {
            logs: allLogs

        });
    });
}