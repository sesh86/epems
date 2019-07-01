var express = require('express');
var app = express();

var template = 
`<!DOCTYPE html> <html> <body>
	<script type="text/javascript">
		var source = new EventSource("/events/");
		source.onmessage = function(e) {
			document.body.innerHTML += e.data + "<br>";
		};
	</script>
</body> </html>`;

app.get('/', function (req, res) {
	res.send(template); // <- Return the static template above
});



// Called once for each new client. Note, this response is left open!
app.get('/events/', function (req, res) {
	var clientId = 0, clients = {}; 
	req.socket.setTimeout(Number.MAX_VALUE);
	res.writeHead(200, {
		'Content-Type': 'text/event-stream', // <- Important headers
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	res.write('\n');
	// (function (clientId) {
	// 	clients[clientId] = res; // <- Add this client to those we consider "attached"
	// 	req.on("close", function () {delete clients[clientId]}); // <- Remove this client when he disconnects
	// })(++clientId)
	ret = res;
	let t=0;
	
	x=setInterval(function () {
		console.log(clientId);
		clientId++;
		// for (i in clients) {
			ret.write("data: " + clientId + "\n\n"); // <- Push a message to a single attached client
		// };
	}, 2000);	
	req.on("close", function () {clearInterval(x);});
});


app.listen(process.env.PORT || 8080);