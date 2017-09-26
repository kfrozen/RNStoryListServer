var fs = require('fs');
var Promise = require('bluebird');
var readFileAsync = Promise.promisify(fs.readFile);

module.exports = readFileAsync;