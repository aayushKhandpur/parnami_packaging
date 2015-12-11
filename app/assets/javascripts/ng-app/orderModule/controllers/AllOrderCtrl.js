orderModule.controller('allOrderCtrl', function ($scope,$location,allOrderMgr,$state) {
	
	$scope.allOrders = [];
	$scope.noOrderMsg = '';
	$scope.sortKey = 'customer_name';
	$scope.reverse;
	$scope.searchAttribute = '$';
	$scope.searchText = {customer_name :'',delivery_address :'',order_details: '',delivery_date: '', $ :''};
	
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
			'name':'Order Details',
			'id':'order_details'
		},
		{
			'name':'Delivery Date',
			'id':'delivery_date'
		}
	];
	
	$scope.getAllOrders = function() {
		allOrderMgr.getAllOrders(function(allOrders) {
			if(allOrders.length > 0) {
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
		$state.go('index.createorder',{orderId: 'new'});
	}
	
	$scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    }
	
	$scope.changeSearchAttribute = function(searchFilter) {
		$scope.searchAttribute = searchFilter;
		$scope.searchText = {customer_name :'',delivery_address :'',order_details: '',delivery_date: '', $ :''};
	}
});