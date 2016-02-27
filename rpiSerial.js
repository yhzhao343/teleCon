var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
    serialPort.write("very interesting\n", function(err, results) {
      console.log('results ' + results);
    });
  }
});