(function() {
    "use strict";
    angular.module('teleCtrl', ['teleCtrl.camera', 'teleCtrl.controller', 'teleCtrl.routes', 'teleCtrl.com']);
    angular.module('teleCtrl.controller', ['teleCtrl.camera', 'teleCtrl.com'])
    angular.module('teleCtrl.camera', ['teleCtrl.com']);
    angular.module('teleCtrl.routes', []);
    angular.module('teleCtrl.com', []);
})();