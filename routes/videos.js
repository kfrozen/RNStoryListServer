var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET videos listing. */
router.get('/', function(req, res, next) {

    fs.readFile("./modals/videos.json", "utf8", function (err, data) {
        res.status(200).send(data);
    });
});

module.exports = router;