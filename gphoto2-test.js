var exec = require('child_process').exec;
var cameraServer = require('http').createServer(cameraServerHandle);
var io = require('socket.io')(cameraServer);
var portNum = 8080;

function cameraServerHandle(req, res) {
    var msg = '';
    req.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        msg += chunk;
    }).on('end', function() {
        res.on('error', function(err) {
            console.error(err);
        });
        res.statusCode = 200;
        console.log('camera server get message: ' + msg);
        console.log();
        res.end();
    })
}

cameraServer.listen(portNum);
var test = 'gphoto2 --auto-detect';

var mySocket = undefined;
io.on('connection', function(socket) {
    mySocket = socket;
    socket.on('auto detect', function(data) {
        console.log(data);
        auto_detect(data);
    })
})

function auto_detect(data) {
    console.log(data);
    exec(test,emitStdout)
}

function emitStdout(err, stdout, stderr) {
    mySocket.emit(stdout)
}