var events = require('events');

var eventEmitter = new events.EventEmitter();

//함수 생성
var connectHandler = function connected() {
	console.log("Connection Successful");

	//data_received 이벤트 발생
	eventEmitter.emit("data_received");
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function() {
	console.log("Data Received");
});

//connection 이벤트 발생
eventEmitter.emit('connection');

console.log("Program has ended");