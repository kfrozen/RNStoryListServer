var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var databaseUtil = Promise.promisifyAll(require('../public/database/databaseUtil'));
var mongodb = require('../public/database/db');

/* GET players listing. */
router.get('/', function(req, res, next) {
    readFromDatabase(res);
});

function readFromDatabase(res) {
    databaseUtil.obtainCollectionAsync('Players')
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

module.exports = router;