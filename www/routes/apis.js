var express = require('express');
var router = express.Router();
/* GET articles listing. */
router.get('/', function (req, res, next) {
    res.json({
        "apis": []
    });
});
router.post('/tip', function (req, res, next) {
    res.json({
        "data": req.body
    });
})
module.exports = router;
