var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
//var router = require('./router/main') (app);

//html 위치 정의
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/*app.get('/', function(req, res) {
	res.send('Hello World');
});*/

//for test
app.get('/webshell',function(req, res) {
	res.send('do not hack :(');
});

var server = app.listen(80,function() {
	console.log("Express server has started on port 80");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret: '@#@$MYSIGN#@$#$', // 쿠키 변조 방지를 위한 sign값
	resave: false,
	saveUninitialized: true 
}));

var router = require('./router/main') (app, fs);