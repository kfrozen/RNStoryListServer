var express = require('express');
var router = express.Router();
var readFileAsync = require('../promiseUtils');

/* GET videos listing. */
router.get('/', function(req, res, next) {

    readFileAsync("./modals/videos.json", "utf8")
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(404).send(err.message);
        });
});

module.exports = router;