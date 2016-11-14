(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUtils', [function() {
        var checkParams = function(requiredParameters, params) {
            for (var k = 0; k < requiredParameters.length; k++) {
                if (params[requiredParameters[k]] === undefined) {
                    return false;
                }
            }
            return true;
        };
        return {
            checkParams: checkParams
        };
    }]);
})(angular);