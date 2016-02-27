var portNum = 8080;
var socket = undefined;

var exec = require('child_process').exec;
var gphoto2 = 'gphoto2 ';
var static = require('node-static');
var file = new static.Server('./public');
var server = require('http').createServer(serverhandle);
var io = require('socket.io')(server);

function serverhandle(req, resp) {
    req.addListener('end', function() {
        file.serve(req,resp);
    }).resume()
}

io.on('connection', function(socket) {
    mySocket = socket;
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

server.listen(portNum);