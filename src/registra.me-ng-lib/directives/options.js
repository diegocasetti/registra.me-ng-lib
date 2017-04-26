// var scripts = document.getElementsByTagName("script")
// var currentScriptPath = scripts[scripts.length - 1].src;
// console.log(currentScriptPath.replace('options.js', 'options.html'));
(function(angular) {
    angular.
    module('registra.meNgLib.directives').config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://**'
        ]);
    }).controller('rgmeOptionsController', ['$scope', 'rgmeStation', function($scope, rgmeStation) {
        $scope.hola = 'HOLAHOLA!';
        console.log(rgmeStation);
    }]).directive('rgmeOptions', [
        function() {
            return {
                restrict: 'E',
                templateUrl: currentScriptPath.replace('options.js', 'options.html')
            };
        }
    ]);
})(angular);