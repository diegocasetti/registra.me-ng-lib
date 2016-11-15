(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogout', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/user/logout';
        var requiredParameters = ['token'];
        var protocol = 'https://';
        var params = {};
        var unsetCookie = function(){
            $cookies.remove('registrame-api-token');
        };
        var call = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.post(protocol + url, params, function(data){
                    
                    success(data);
                }, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }
            unsetCookie();
            params = {};
        };
        return {
            call: call
        };
    }]);
})(angular);