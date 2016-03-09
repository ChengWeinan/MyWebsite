angular.module('service.http', []).factory('httpService',[
    '$q', '$http',
    function($q, $http){
    	function dataTrans(actionName, postData){
    		var urlParams = {
				environment: 'host',
				operationSuffix: '.json',
				mockDataPath: 'data/'
			};
			var getOperationUrl = function(actionName){
				if(urlParams.environment === 'local'){
					return urlParams.mockDataPath + actionName + urlParams.operationSuffix;
				}else if(urlParams.environment === 'host'){
					return actionName + urlParams.operationSuffix;
				}
			};
    		var deferred = $q.defer();
    		var options = {
				method: 'POST',
				timeout: 5000,
				cache: false,
				url: getOperationUrl(actionName),
				data: postData,
				headers:{
					'Content-Type': 'application/json',
					'Accept-Language': 'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3'
				}
    		};

    		$http(options)
	    		.success(function(data){
    				deferred.resolve(data);
	    		})
	    		.error(function(data, status){
	    			deferred.reject(data);
	    		});
    		
    		return deferred.promise;
    	}
    	
    	return {
    		dataTrans: dataTrans,
    	};
    }
]);