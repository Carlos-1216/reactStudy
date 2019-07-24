module.exports = function(app, fs)
{
	app.get('/', function(req,res) {
		res.render('index', {
			title: "MY HomePage",
			length: 5
		})
	});

	app.get('/test', function(req,res) {
		res.render('index2', {
			title: "Homepage2",
			length: 5
		})
	});
	/*
	app.get('/', function(req, res) {
		res.render('index.html')
	});

	app.get('/about', function(req, res) {
		res.render('about.html');
	})*/
}