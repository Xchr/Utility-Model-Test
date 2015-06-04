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
		if(obj.func){
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
		}else if(obj.flg === "onlyreceive"){
			//function to generating random integers
			function random (size){
				var y = [];
				while(size >0) y.push(size--)
				y.sort(function() {return .5 - Math.random()});
				return y;
			};
			var msg10 = random(10000), msg20 = random(20000), msg30 = random(30000), msg40 = random(40000), msg50 = random(50000), msg60 = random(60000), msg70 = random(70000), msg80 = random(80000), msg90 = random(90000), msg100 = random(100000);
		
			//generate array for testing different offloading size
			var msg1d2 = random(1200), msg2d4 = random(2400), msg3d6 = random(3600), msg4d8 = random(4800), msg6d0 = random(6000), msg7d2 = random(7200), msg8d4 = random(8400), msg9d6 = random(9600), msg10d8 = random(10800), msg12d0 = random(12000);
			
			//generate array of 64KB, 96KB, 128KB, 192KB, 256KB and 75,000
			var msg64k = random(12773), msg96k = random(18234),  msg128k = random(23696),  msg192k = random(34618),  msg256k = random(45541),  msg75 = random(75000);
			
			//store the arrays to be sent
			var msgs = [ msg10, msg20, msg30, msg40, msg50, msg60, msg70, msg80, msg90, msg100, msg1d2, msg2d4, msg3d6, msg4d8, msg6d0, msg7d2, msg8d4, msg9d6, msg10d8, msg12d0, msg64k, msg96k, msg128k, msg192k, msg256k, msg75];
			var onlyrec = msgs[obj.value];
			connection.send(JSON.stringify(onlyrec));
		}else{
			connection.send(JSON.stringify(receivetime));
			console.log("Server receives at : " + receivetime );
		};
		console.log("Server finishes all at " + (new Date()));
	});
});