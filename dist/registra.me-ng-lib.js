(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('registra.meNgLib.config', [])
      .value('registra.meNgLib.config', {
          debug: true
      });

  // Modules
  angular.module('registra.meNgLib.directives', []);
  angular.module('registra.meNgLib.filters', []);
  angular.module('registra.meNgLib.services', []);
  angular.module('registra.meNgLib',
      [
          'registra.meNgLib.config',
          'registra.meNgLib.directives',
          'registra.meNgLib.filters',
          'registra.meNgLib.services',
          'ngCookies',
      ]);

})(angular);

(function(angular) {
    angular.
    module('registra.meNgLib.services', []).
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
(function(angular) {
    angular.
    module('registra.meNgLib.services', []).
    factory('request', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {
        var post = function(url, params, success, errorFunction) {
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var request = $http.post(encodeURI(url), $httpParamSerializerJQLike(params), config)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, header, config) {
                errorFunction(data);
            });
        };
        var get = function(url, params, success, errorFunction) {
            var request = $http.get(encodeURI(url + $httpParamSerializerJQLike(params)))
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, header, config) {
                errorFunction(data);
            });
        };
        var buildUrl = function(url, params, success) {
            success({
                status: 'ok',
                url: encodeURI(url + $httpParamSerializerJQLike(params))
            });
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services', []).
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