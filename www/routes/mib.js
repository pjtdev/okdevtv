var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');


router.all('*', function(req, res, next) {
    var path = req.baseUrl.split('/');
    var mdPath = path.slice(2).join('/');
    fs.readFile('./public/md/' + mdPath + '.md', function(err, data){
        if (err) throw err;
        res.send(marked(data.toString()));
    });
});

module.exports = router;
