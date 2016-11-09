(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('utils', [function() {
        var checkParams = function(requiredParameters, params) {
            for (var i = 0; i < requiredParameters.lenght; i++) {
                var founded = false;
                for (var k = 0; k < params.lenght; k++) {
                    if (requiredParameters[i] === k.name){
                        founded = true;
                    }
                }
                if (!founded){
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