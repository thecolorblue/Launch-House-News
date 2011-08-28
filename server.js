/* 

Launch House News
    created at:
    WRITABL
    
*/


var express = require('express');


var app = express.createServer();

app.use(express.static(__dirname + '/'));

app.listen(3000);

