var express = require('express');
var router = express.Router();
var readFileAsync = require('../promiseUtils');

/* GET image */
router.get('*', function(req, res, next) {

    readFileAsync("./modals/images/" + req.path, "binary")
        .then(function (data) {
            res.setHeader("Content-Type", "image/jpeg");
            res.writeHead(200, "Ok");
            res.write(data, "binary");
            res.end();
        })
        .catch(function (err) {
            res.status(404).send(err.message);
        });
});

module.exports = router;