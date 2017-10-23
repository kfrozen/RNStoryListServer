var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var databaseUtil = Promise.promisifyAll(require('../public/database/databaseUtil'));
var mongodb = require('../public/database/db');

/* GET articles listing. */
router.get('/', function(req, res, next) {
    //readLocalFileAsync(res);

    readFromDatabase(res);
});

function readFromDatabase(res) {
    databaseUtil.obtainCollectionAsync('Articles')
        .then(function (collection) {
            collection.find().toArray(function (err, result) {
                res.status(200).send(result);

                res.end();

                mongodb.close(true);
            });
        })
        .catch(function (err) {
            res.status(404).send(err.message);

            res.end();

            mongodb.close(true);
        });
}

function readLocalFileAsync(res) {
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
}

module.exports = router;