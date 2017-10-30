var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/HupuCrawlerDB';

function DatabaseUtil(){
}

DatabaseUtil.obtainCollection = function(collectionName, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection(collectionName, function (err, collection) {
            if (err) {
                db.close();

                return callback(err);
            }

            callback(null, collection);

            db.close();
        });
    });
};

module.exports = DatabaseUtil;