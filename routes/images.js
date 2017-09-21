var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET image */
router.get('*', function(req, res, next) {

    res.setHeader("Content-Type", "image/jpeg");
    var content =  fs.readFileSync("./modals/images/" + req.path,"binary");
    res.writeHead(200, "Ok");
    res.write(content, "binary");
    res.end();
});

module.exports = router;