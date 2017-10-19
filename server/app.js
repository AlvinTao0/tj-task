var compression = require('compression')
var express = require('express');
var api = require('./api.js');
var {Url} = require('url');

var app = express();
app.use(compression())
app.use(express.static('dist'));
app.use(api);

// 服务器
app.listen(4003, function() {
    console.log("app is listening ai port 4003");
})