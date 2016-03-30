var portNum = 8080;
var socket = undefined;
PORT = 7624;
HOST = "localhost";

var exec = require('child_process').exec;
var gphoto2 = 'gphoto2 ';
var static = require('node-static');
var file = new static.Server('./public');
var server = require('http').createServer(serverhandle);
var io = require('socket.io')(server);
var net = require("net");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

function serverhandle(req, resp) {
    req.addListener('end', function() {
        file.serve(req,resp);
    }).resume()
}

io.on('connection', function(socket) {
    console.log("new connection");
    mySocket = socket;

    // var tcp = new net.Socket();
    // tcp.connect(PORT, HOST, function() {
    //   console.log(new Date().toISOString()  + " connected to indiserver");
    //   if (web.upgradeReq.client.writable) web.send(JSON.stringify({"webindi":{"indi_connection":1}}));
    // });

    // tcp.on("close", function() {
    //   if (!web.upgradeReq.client.writable) return;
    //   console.log(new Date().toISOString() + " disconnected from indiserver");
    //   web.send(JSON.stringify({"webindi":{"indi_connection":0}}));
    // });

    // tcp.on("error", function() {
    //   console.log(new Date().toISOString()  + " tcpsocket error");
    // });

    // var buff = "";
    // tcp.on("data", function(data) {
    //   data = String(data).split("\n");
    //   for (var i=0; i<data.length; i++) {
    //     buff += data[i];
    //     if (buff.slice(-1) != ">") continue;
    //     err = parser.parseString(buff, function (err, res) {
    //       if (res && web.readyState === 1) web.send(JSON.stringify(res));
    //     });
    //     if (err != undefined && !err.errThrown) buff = "";
    //   }
    // });

    socket.on('command', function(data) {
        console.log(data);
        auto_detect(data.command);
    })
})

function auto_detect(command) {
    console.log(command);
    console.log(gphoto2 + command);
    exec(gphoto2 + command,emitStdout)
}

function emitStdout(err, stdout, stderr) {
    mySocket.emit('debug', stdout)
}

function send_indi(message) {
    mySocket.emit('indi', message);
}

server.listen(portNum);