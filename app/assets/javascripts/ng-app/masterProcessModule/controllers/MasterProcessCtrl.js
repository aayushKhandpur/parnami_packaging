masterProcessModule.controller('masterProcessCtrl', function ($scope,$log,$location,masterProcessMgr) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = null;
	$scope.findView;
	$scope.showList;

	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}

	$scope.loadDefaults = function() {
		$scope.allMasterProducts = [];
		$scope.masterProductId = null;
		$scope.masterProduct = {};
		$scope.findView = 'none';
		$scope.showList = true;
		masterProcessMgr.getMasterProducts(function(masterProducts){
			$.each(masterProducts,function(k,v) {
				$scope.allMasterProducts.push(v.master_process);
			});
			$scope.applyChanges();
		});
	}
	$scope.loadDefaults();

	$scope.createMasterProcess = function(form) {
		var validated = true;
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
			}
		$scope.errorMsg = '';

		if($scope.allMasterProducts.length != 0){
				angular.forEach($scope.allMasterProducts,function(listItem){
					if (listItem.name.toLowerCase() === $scope.masterProduct.name.toLowerCase()){
						$scope.errorMsg = "Process name already taken";
						validated = false;
						return;
					}
				});
			}
			if(validated){
				masterProcessMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
					$.toaster({ priority : 'success', title : 'Info', message : 'Master Process is Saved',width:'100%'});
					$scope.loadDefaults();
					$scope.applyChanges();
					$scope.go('/index/process/')
				});
			}
	}

	$scope.showMasterProduct = function(pId) {
		var masterProduct = {};
		for(var counter = 0;counter < $scope.allMasterProducts.length;counter++) {
			if($scope.allMasterProducts[counter].id == pId) {
				masterProduct = $scope.allMasterProducts[counter];
				break;
			}
		}
		$scope.masterProduct = masterProduct;
		$scope.masterProductId = pId;
		$scope.findView = 'showeditandview';
		$scope.showList = false;
	}

	$scope.showNewProcess = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithNewProcess';
		$scope.location = {};
	}

	$scope.editProcess = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithOldProcess';
	}

	$scope.deleteProcess = function(masterProductId){
		masterProcessMgr.deleteProcess(masterProductId,function() {
			$.toaster({ priority : 'success', title : 'Info', message : 'Master Process is Deleted',width:'100%'});
			$scope.loadDefaults();

			$scope.applyChanges();
		});
	}

	$scope.go = function ( path ) {
		$location.path( path );
	};

});


angular.module('AngularRails').config(['valdrProvider', function(valdrProvider) {

  valdrProvider.addConstraints({
    "ProcessUpdate": {
      "name": {
        "required": {
          "message": "Name is required"
        }
      }
    }
  });
}]);
