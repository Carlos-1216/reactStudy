module.exports = function(app, fs)
{
     app.get('/',function(req,res){
         var sess = req.session;

         res.render('index2', {
             title: "MY HOMEPAGE",
             length: 5,
             name: sess.name,
             username: sess.username
         })
     });
	/*
	app.get('/test', function(req,res) {
		res.render('index2', {
			title: "Homepage2",
			length: 5
		})
	});
	*/
	//list API
	app.get('/list', function(req, res) {
		fs.readFile(__dirname+"/../data/" + "user.json","utf8", function(err, data) {
			console.log(data);
			res.end(data);
		});
	})

	//user detail
	app.get('/getUser/:username', function(req, res) {
		fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
		});
	});

	//POST DATA
	app.post('/addUser/:username', function(req, res) {
		var result = { };
		var username = req.params.username;

		if(!req.body["password"] || !req.body["name"]) {
			result["success"] = 0;
			result["error"] = "invalid request";
			res.json(result);
			return;
		}

		fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
			var users = JSON.parse(data);
			if(users[username]) {
				result["success"] = 0;
				result["error"] = "duplicate";
				res.json(result);
				return;
			}

			//Add To Data
			users[username] = req.body;

			//save data
			fs.writeFile(__dirname+"/../data/user.json",
				JSON.stringify(users,null,'\t'), "utf8", function(err, data) {
					result = {"success": 1};
					res.json(result);
			})
		})
	});

	//데이터 업데이트
	app.put('/updataUser/:username', function(req, res) {
		var result = { };
		var username = req.params.username;

		if(!req.body["password"] || !req.body["name"]) {
			result["success"] = 0;
			result["error"] = "invalid request";
			res.json(result);
			return;
		}

		fs.readFile(__dirname + "/../data/user.json",'utf8', function(err, data) {
			var users = JSON.parse(data);

			//수정 데이터 add
			users[username] = req.body;

			//data 저장
			fs.writeFile(__dirname+"/../data/user.json", JSON.stringify(users, null, '\t'),"utf8", function(err, data) {
				result = {"success": 1};
				res.json(result);
			})
		})
	});

	//데이터 삭제
	app.delete('/deleteUser/:username', function(req, res) {
		var result = { };

		//데이터 로드
		fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err, data) {
			var users = JSON.parse(data);

			//없는경우
			if(!users[req.params.username]) {
				result["success"] = 0;
				result["error"] = "not found";
				res.json(result);
				return;
			}

			//delete from data
			delete users[req.params.username];

			//save file
			fs.writeFile(__dirname+"/data/user.json",JSON.stringify(users,null,'\t'), "utf8",function(err, data) {
				result["success"]=1;
				res.json(result);
				return;
			})
		})
	})

	//로그인
	app.get('/login/:username/:password', function(req, res){
        var sess;
        sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;
            var result = {};
            if(!users[username]){
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);

            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        })
    });

	//로그아웃
    app.get('/logout', function(req, res) {
        sess = req.session;
        if(sess.username){
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                }else {
                    res.redirect('/');
                }
            })
        }else {
            res.redirect('/');
        }
    })

	/*
	app.get('/', function(req, res) {
		res.render('index.html')
	});

	app.get('/about', function(req, res) {
		res.render('about.html');
	})*/
}