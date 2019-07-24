var express = require('express');
var app = express();
var router = require('./router/main') (app);

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

var server = app.listen(3000,function() {
	console.log("Express server has started on port 3000");
});

app.use(express.static('public'));