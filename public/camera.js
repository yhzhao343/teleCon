(function() {
  'use strict'
  angular.module('teleCtrl.camera')
  .service('cam', ['socket', function (socket) {
    var myCommandList = {
      autoDetect:'--auto-detect',
      listConfig:'--list-config'
    }

    var myShutterCmdList = {
      pressShutter:'--set-config eosremoterelease=5',
      releaseShutter:'--set-config eosremoterelease=4'
    }

    var thisPointer = this;
    var functionFactory = function functionFactory(key, list) {
      var mySocket = socket
      console.log(list);
      thisPointer[key] = function() {
        mySocket.emit('command', {command:list[key]},
          function(result) {
            console.log(result);
          })
      }
    }
    this.commandList = myCommandList;
    this.shutter = myShutterCmdList;

    var cmdObjectArray = [myCommandList, myShutterCmdList];
    cmdObjectArray.forEach(function(cmdObject) {
      //var funcFactory = functionFactory;
      Object.keys(cmdObject).forEach(function(key) {
        functionFactory(key, cmdObject);
      })
    })
  }])
})()