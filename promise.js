var EventEmitter = require('events').EventEmitter;
var Util = require('util');

var Promise = function () {
    EventEmitter.call(this);
};
Util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (onFinished, onError, onProgress) {
    if(typeof onFinished === 'function'){
        this.once('success', onFinished);
    }

    if(typeof onError === 'function'){
        this.once('error', onError);
    }

    if(typeof onProgress === 'function'){
        this.on('progress', onProgress);
    }

    return this;
};

var Deferred = function () {
    this.state = 'unfullfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function (res) {
    this.state = 'fullfilled';
    this.promise.emit('success', res);
};

Deferred.prototype.reject = function (err) {
    this.state = 'failed';
    this.promise.emit('error', err);
};

Deferred.prototype.progress = function (data) {
    this.promise.emit('progress', data);
};

var Promisify = function (res) {
    var deferred = new Deferred();
    var result = '';

    res.on('data', function (chunk) {
        result += chunk;
        deferred.progress(chunk);
    });

    res.on('end', function () {
        deferred.resolve(result);
    });

    res.on('error', function (err) {
        deferred.reject(err);
    });

    return deferred.promise;
};

module.exports = Promisify;
