var express = require('express');
var request = require('request')
var path = require('path');
var api = require('./api.js');
var fs = require('fs');
var qs = require('qs');
var {Url} = require('url');

var app = express();
//app.use(express.static('dist'));
app.use(api);

// 服务器
app.listen(4003, function() {
    console.log("app is listening ai port 4003");
})