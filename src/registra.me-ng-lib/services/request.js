(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeRequest', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {
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

        return {
            post: post,
            get: get,
            buildUrl: buildUrl
        }
    }]);
})(angular);