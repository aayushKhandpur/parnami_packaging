productModule.controller('productCtrl', function ($scope,$log,$location,utilitySrv) {
        
		/*var objList = utilitySrv.getLinkedObject();
		if(!utilitySrv.isLastUrl($location.absUrl())){
			objList.add($location.absUrl());
		}*/
		
		
		$scope.navigateToProductPlan = function() {
		
			$location.path('/productprocessplan');
		
		}
		
		/*$scope.goBackToPrevious = function() {
			var secondLastNode = objList.item(objList._length - 2);
			var pathName=secondLastNode.data.split("#");
			var deleted = objList.remove(objList._length - 1);
				console.log("remove return  ::"+deleted);
			$location.path(pathName[1]);
		}*/
		
		
    });