var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for "+pathname+" received.")

	//파일 이름이 비어있을 경우 index.html로 설정
	if(pathname=="/") {
		pathname = "/index.html";
	}

	fs.readFile(pathname.substr(1), function(err, data) {
		if(err) {
			console.log(err);
			//페이지를 찾을 수 없음
			response.writeHead(404, {'Content-Type': 'text/html'});
		}
		else {
			//페이지를 찾음
			response.writeHead(200, {'Content-Type': 'text/html'});

			//파일 리드 후 responseBody에 작성
			response.write(data.toString());
		}

		response.end();
	});
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');