(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogin', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/user/login';
        var requiredParameters = ['secret', 'email', 'password'];
        var protocol = 'https://';
        var params = {};
        var setSecret = function(s) {
            params.secret = s;
        };
        var setEmail = function(e) {
            params.email = e;
        };
        var setPassword = function(p) {
            params.password = p;
        };
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var setTokenCookie = function(token){
            $cookies.put('registrame-api-token', token);
        };
        var isLogged = function(){
            if($cookies.get('registrame-api-token')){
                return true;
            }else{
                return false;
            }
        };
        var call = function(success, error) {
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.post(protocol + url, params, function(data){
                    setTokenCookie(data.token);
                    delete data.token;
                    success(data);
                }, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        return {
            setSecret: setSecret,
            setEmail: setEmail,
            setPassword: setPassword,
            setInsecureProtocol: setInsecureProtocol,
            isLogged: isLogged,
            call: call
        };
    }]);
})(angular);