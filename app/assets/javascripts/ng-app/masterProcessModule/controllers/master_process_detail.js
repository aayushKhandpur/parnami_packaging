masterProcessModule.controller('masterProcessDetailCtrl', function ($scope,$log,$location,masterProcessMgr,processId) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = processId;
	$scope.findView = 'detailView';

  $scope.getAllMasterProcesses = function() {
    $scope.allMasterProducts = [];
    masterProcessMgr.getMasterProducts(function(masterProcess){
      $.each(masterProcess,function(k,v) {
        $scope.allMasterProducts.push(v.master_process);
      });
    });
  }
  $scope.getAllMasterProcesses();

  $scope.getMasterProcess = function (processId) {
    masterProcessMgr.getMasterProcessById(processId,function(processDetails) {
      $scope.masterProduct = processDetails.master_process;
    });
  }
  $scope.getMasterProcess($scope.masterProductId);

  $scope.editProcess = function(){
    $scope.findView = 'editView';
  }

  $scope.updateMasterProcess = function( form ){
    var validated = true;
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
			}
		$scope.errorMsg = '';

		if($scope.allMasterProducts.length != 0){
				angular.forEach($scope.allMasterProducts,function(listItem){
					if (listItem.name.toLowerCase() === $scope.masterProduct.name.toLowerCase()){
            if(listItem.description != null && $scope.masterProduct.description != null){
              if(listItem.description.toLowerCase() === $scope.masterProduct.description.toLowerCase()){
                $scope.errorMsg = "Process name already taken";
                validated = false;
                return;
              }
            }
					}
				});
			}
			if(validated){
				masterProcessMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
					$.toaster({ priority : 'success', title : 'Info', message : 'Master Process is updated',width:'100%'});
					$scope.loadDefaults();
					$scope.applyChanges();
          $scope.go('/index/process/')
				});
			}
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
