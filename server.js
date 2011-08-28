/* 

Launch House News
    created at:
    WRITABL
    
*/


var express = require('express');


var app = express.createServer();

app.use(express.static(__dirname + '/gh-pages'));

app.listen(3000);

