var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');


router.all('*', function(req, res, next) {
    var path = req.baseUrl.split('/');
    var mdPath = path.slice(2).join('/');
    fs.readFile('./public/md/' + mdPath + '.md', function(err, data){
        if (err) throw err;
        var html = setBody(marked(data.toString()), path);
        res.send(html);
    });
});

function setBody(data, path) {
    var folder = '/md/' + path[2] + '/';
    var html = data.replace(/img src="images/g, 'img src="' + folder + 'images');
    html = '<!DOCTYPE html>\
<html lang="ko">\
<head>\
    <title>' + path[3] + '</title>\
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />\
    <meta property="og:url" content="http://okdevtv.com' + path.join('/') + '" />\
    <link rel="stylesheet" href="/css/style-md.css">\
</head><body>\
    <!-- Header -->\
    <header id="header">\
        <!-- Logo -->\
        <h1 id="logo"><a href="/"><img \
        src="/images/logo.png" style="width: 36px; margin-right: 6px; margin-bottom: -6px;">OKdevTV</a></h1>\
    </header>' + html + "\
    <script>\
        (function (i, s, o, g, r, a, m) {\
            i['GoogleAnalyticsObject'] = r;\
            i[r] = i[r] || function () {\
                (i[r].q = i[r].q || []).push(arguments)\
            }, i[r].l = 1 * new Date();\
            a = s.createElement(o),\
                m = s.getElementsByTagName(o)[0];\
            a.async = 1;\
            a.src = g;\
            m.parentNode.insertBefore(a, m\
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');\
\
        ga('create', 'UA-49100336-1', 'auto');\
        ga('send', 'pageview');</script>\
</body></html>";
    return html;
}

module.exports = router;
