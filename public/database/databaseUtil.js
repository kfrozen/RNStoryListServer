var mongodb = require('./db');

function DatabaseUtil(){
}

DatabaseUtil.obtainCollection = function(collectionName, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close(true);

                return callback(err);
            }

            return callback(null, collection);
        });
    });
};

module.exports = DatabaseUtil;