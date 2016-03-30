(function() {
    'use strict'
    angular.module('teleCtrl.controller')
    .controller('HomeCtrl', ['$scope', 'star_settings', function ($scope, star_settings) {
        star_settings.map_on = 1;
        $scope.star_settings = star_settings;
    }])
})();