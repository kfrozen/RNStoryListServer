var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var databaseUtil = Promise.promisifyAll(require('../public/database/databaseUtil'));

/* GET players listing. */
router.get('/', function(req, res, next) {
    readFromDatabase(res, {}, {'_section': 1, 'jersey': 1});
});

router.get('/goalkeepers', function (req, res, next) {
    readFromDatabase(res, {'position': '门将'});
});

router.get('/defenders', function (req, res, next) {
    readFromDatabase(res, {'position': '后卫'});
});

router.get('/midfielders', function (req, res, next) {
    readFromDatabase(res, {'position': '中场'});
});

router.get('/forwards', function (req, res, next) {
    readFromDatabase(res, {'position': '前锋'});
});

function readFromDatabase(res, query, sort) {
    return new Promise(function (resolve, reject) {
        databaseUtil.obtainCollectionAsync('Players')
            .then(function (collection) {
                collection.find(query).sort(sort ? sort : {'jersey': 1}).toArray(function (err, result) {
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
    });
}

module.exports = router;