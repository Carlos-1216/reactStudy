var http = require("http");

http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("Hello World\n");
}).listen(8081); // 포트 어지간하면 손대지 말것

console.log("Server running at http://127.0.0.1:8081");
