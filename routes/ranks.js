var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var databaseUtil = Promise.promisifyAll(require('../public/database/databaseUtil'));

router.get('/', function(req, res, next) {
    readFromDatabase(res, {});
});

function readFromDatabase(res, query, sort) {
    databaseUtil.obtainCollectionAsync('Ranks')
        .then(function (collection) {
            collection.find(query).sort(sort ? sort : {'_id': 1}).toArray(function (err, result) {
                if(!res){
                    resolve(result);
                }
                else{
                    res.status(200).send(result);

                    res.end();
                }
            });
        })
        .catch(function (err) {
            if(!res){
                reject(err);
            }
            else{
                res.status(404).send(err.message);

                res.end();
            }
        });
}

module.exports = router;