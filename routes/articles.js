var express = require('express');
var router = express.Router();
var readFileAsync = require('../promiseUtils');

/* GET articles listing. */
router.get('/', function(req, res, next) {

    // readFileAsync("./modals/articles.json", 'utf-8')
    //     .then(function (data) {
    //         res.status(200).send(data);
    //     })
    //     .catch(function (err) {
    //         res.status(404).send(err.message);
    //     });

    var reader = require('fs').createReadStream("./modals/articles.json", {
            flags: 'r',
            encoding: 'utf8',
            autoClose: true,
            mode: 0666
        });

    var data = "";

    reader.on('data', function (chunk) {
        data += chunk;
    });

    reader.on('end', function () {
        res.status(200).send(data);
    });

    reader.on('error', function (err) {
        res.status(404).send(err.message);
    });
});

module.exports = router;