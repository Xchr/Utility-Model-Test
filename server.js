var websocketserver = require('websocket').server,
	http = require('http'),
	fs = require('fs');
	
fs.readFile('./index.html',function(err,html){
	if(err){
		throw err;
	}
	http.createServer(function(req,res){
		res.writeHeader(200,{"Conten-Type": "text/html"});
		res.write(html);
		res.end();
		
	}).listen(5018);
});
console.log("Server listening at : " + 5018);


var server = http.createServer(function(request, response) {});
server.listen(6385, function() {
    console.log((new Date()) + ' Server is listening on port 6385');
});
var wsserver = new websocketserver(
{
	httpServer : server
});

wsserver.on('request',function(request) {
	console.log((new Date()) + ' Connection from origin ' + request.remoteAddress + '.');
	var connection = request.accept(null,request.remoteAddress);
	console.log((new Date()) + 'Connection accepted for ' + request.remoteAddress + '.');
	connection.on('message', function(message){
		console.log(message);
		//console.log(message.length);
		var obj = JSON.parse(message.utf8Data);
		//console.log(obj.arg);
		if (obj.flg === false){
			func = eval ( '(' + obj.func + ')');
			var rtst = func(obj.arg);
			var rtmsg = {rtst: rtst};
			connection.send(JSON.stringify(rtmsg));
		}else if (obj.flg === true){
			console.log(func);
			var rtst = func(obj.arg);
			var rtmsg = {rtst: rtst};
			connection.send(JSON.stringify(rtmsg));
		};
		console.log("Server finishes all at " + (new Date()));
	});
});