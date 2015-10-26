utilityModule.directive('backButton', function () {

  return {
		template: '<button class="btn btn-default col-md-1" ng-click="goBackToPrevious()"><i class="fa fa-level-up fa-rotate-270"></i></button>',
		restrick:'E',
		controller: function($scope,$location,utilitySrv) {
			var objList = utilitySrv.getLinkedObject();
			if(!utilitySrv.isLastUrl($location.absUrl())){
				objList.add($location.absUrl());
			}
			$scope.goBackToPrevious = function() {
				
				var secondLastNode = objList.item(objList._length - 2);
				var pathName = secondLastNode.data.split("#");
				var deleted = objList.remove(objList._length - 1);
					console.log("remove return  ::"+deleted);
				$location.path(pathName[1]);
			}
		}
	  };

    });