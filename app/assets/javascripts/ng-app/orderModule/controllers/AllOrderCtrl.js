orderModule.controller('allOrderCtrl', function ($scope,$location,allOrderMgr,$state) {

	$scope.allOrders = [];
	$scope.noOrderMsg = '';
	$scope.sortKey = 'customer_name';
	$scope.sortKey = 'billing_name';
	$scope.reverse;
	$scope.searchAttribute = '$';
	$scope.searchText = {customer_name :'',delivery_address :'',billing_name: '', $ :''};

	$scope.applyChanges = function()
	{
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}

	$scope.searchAttributeList = [
		{
			'name':'All',
			'id':'$'
		},
		{
			'name':'Customer Name',
			'id':'customer_name'
		},
		{
			'name':'Address',
			'id':'delivery_address'
		},
		{
			'name':'Billing Name',
			'id':'billing_name'
		}
	];

	$scope.getAllOrders = function() {
		allOrderMgr.getAllOrders(function(allOrders) {
			if(allOrders.length > 0) {
				console.log(allOrders);
				$scope.allOrders = allOrders;
				$scope.gridOptions = { data: 'allOrders' };
			}
			else
				$scope.noOrderMsg = 'There is no Order present, please create on new button to create a new Order.';
			$scope.applyChanges();
		});
	}

	$scope.getAllOrders();

	$scope.createNewOrder = function() {
		$state.go('index.order.create.order',{orderId: 'new'});
	}

	$scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

	$scope.changeSearchAttribute = function(searchFilter) {
		$scope.searchAttribute = searchFilter;
		$scope.searchText = {customer_name :'',delivery_address :'',billing_name: '', $ :''};
	}
});
