var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');


router.all('*', function(req, res, next) {
    var path = req.baseUrl.split('/');
    if (path.length < 4) {
        path.push(path[2]);
    };
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
    <script src="/js/gwgpot.js"></script>\
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />\
    <meta property="og:title" content="' + path[3] + '" />\
    <meta property="og:url" content="http://okdevtv.com' + path.join('/') + '" />\
    <link rel="stylesheet" href="/css/style-md.css">\
</head><body>\
    <!-- Header -->\
    <header id="header">\
        <!-- Logo -->\
        <h1 id="logo"><a href="/"><img \
        src="/images/logo.png" style="width: 36px; margin-right: 6px; margin-bottom: -6px;">OKdevTV</a></h1>\
    </header>' + html + "\
    <script>\n\
        (function (i, s, o, g, r, a, m) {\n\
            i['GoogleAnalyticsObject'] = r;\n\
            i[r] = i[r] || function () {\n\
                (i[r].q = i[r].q || []).push(arguments)\n\
            }, i[r].l = 1 * new Date();\n\
            a = s.createElement(o),\n\
                m = s.getElementsByTagName(o)[0];\n\
            a.async = 1;\n\
            a.src = g;\n\
            m.parentNode.insertBefore(a, m)\n\
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');\n\
\n\
        ga('create', 'UA-49100336-1', 'auto');\n\
        ga('send', 'pageview');</script>\n\
<div id=\"whatelse\"><a href=\"/md/list.html\">What Else?</a></div>\
<script>\
  (function (w,i,d,g,e,t,s) {w[d] = w[d]||[];t= i.createElement(g);\n\
    t.async=1;t.src=e;s=i.getElementsByTagName(g)[0];s.parentNode.insertBefore(t, s);\n\
  })(window, document, '_gscq','script','//widgets.getsitecontrol.com/57011/script.js');\n\
</script>\
</body></html>";
    return html;
}

module.exports = router;
