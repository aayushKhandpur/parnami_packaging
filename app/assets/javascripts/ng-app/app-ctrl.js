parnamiPackaging.controller('HomeCtrl', function ($scope,$http,utilitySrv,$location) {

		var objList = utilitySrv.getLinkedObject();
		$scope.treeStructure = [
			{
				order: {
					order_details: 'Order Detail 1',
					order_id:1,
					order_products: [
						{
							product: {
								product_name: 'Product 1',
								product_id: 1
							}
						},
						{
							product: {
								product_name: 'Product 2',
								product_id: 2
							}
						}
					]
					
				}
			},
			{
				order: {
					order_details: 'Order Detail 2',
					order_id:2,
					order_products: [
						{
							product: {
								product_name: 'Product 3',
								product_id: 3
							}
						},
						{
							product: {
								product_name: 'Product 4',
								product_id: 4
							}
						}
					]
					
				}
			}
		];
		objList.add($location.absUrl());
		if($location.absUrl().indexOf('#') == -1)
			$location.path('/index');
        
    });