(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('login', ['request', 'utils', '$cookies', function(request, utils, $cookies) {
        this.url = 'api.registra.me/api-v1/client/user/login';
        this.requiredParameters = ['secret', 'email', 'password'];
        this.protocol = 'https://';
        this.params = [];
        var setSecret = function(secret) {
            this.params.push({
                name: 'secret',
                value: secret
            });
        };
        var setEmail = function(email) {
            this.params.push({
                name: 'email',
                value: email
            });
        };
        var setPassword = function(password) {
            this.params.push({
                name: 'password',
                value: password
            });
        };
        var setInsecureProtocol = function() {
            this.protocol = 'http://';
        };
        var setTokenCookie = function(token){
            $cookies.put('registrame-api-token', token);
        };
        var call = function(success, error) {
            if (utils.checkParams(this.requiredParameters, this.params)) {
                request.post(this.protocol + this.url, this.params, function(data){
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
        };
        return {
            setSecret: setSecret,
            setEmail: setEmail,
            setPassword: setPassword,
            setInsecureProtocol: setInsecureProtocol,
            call: call
        };
    }]);
})(angular);