(function() {
    'use strict'
    angular.module('teleCtrl.controller')
    .controller('HomeCtrl', ['$scope', 'cam', 'socket', '$interval', 'star_database', 'star_calc', function ($scope, cam, socket, $interval, star_database, star_calc) {
        $scope.title = "DemoCtrl";
        $scope.d3Data = [
            {title: "Greg", score:12},
            {title: "Ari", score:43},
            {title: "Loser", score: 87}
        ];

        $scope.counter = 0;
        var counterInterval = undefined;
        function incrementCounter() {
            $scope.counter++;
        }
        $scope.startCounter = function startCounter() {
            counterInterval = $interval(incrementCounter, 1000);
        }
        $scope.clearCounter = function clearCounter() {
            cancel(counterInterval);
            $scope.counter = 0;
        }
        $scope.shutterPressed = false;
        $scope.info = {debug:""};
        $scope.cam = cam;
        $scope.autoDetect = cam.autoDetect;
        socket.on('debug', function(message) {
            $scope.info.debug = message
        })
        $scope.test_star = star_database.stars[5];
        $scope.LST = star_calc.radec2azel();
    }])
})();