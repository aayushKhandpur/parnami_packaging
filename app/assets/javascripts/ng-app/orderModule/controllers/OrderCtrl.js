angular.module('orderModule')
    .controller('orderCtrl', function ($scope,$window,$log,$location,orderMgr,utilitySrv) {
	
		/*var objList = utilitySrv.getLinkedObject();
		if(!utilitySrv.isLastUrl($location.absUrl())){
			objList.add($location.absUrl());
		}*/
		
		
		console.log($location.absUrl());
        
		$scope.order = {};
		
		$scope.createOrder = function() {
		
			$log.info('##order values are:'+JSON.stringify($scope.order));
			
			orderMgr.createOrder($scope.order);
		
		}
		
		$scope.navigateToProduct = function() {
		$location.path('/orderproducts');
			console.log($location.path());
		}
		
		
		/*$scope.goBackToPrevious = function() {
			var secondLastNode = objList.item(objList._length - 2);
			var pathName=secondLastNode.data.split("#");
			var deleted = objList.remove(objList._length - 1);
				console.log("remove return  ::"+deleted);
			$location.path(pathName[1]);
		
		}*/
		
    });