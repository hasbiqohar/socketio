var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('chat message', function(message) {
		io.emit('chat message', message);
	});
});

http.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));