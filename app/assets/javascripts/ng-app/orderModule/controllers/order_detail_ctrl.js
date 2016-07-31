orderModule.controller('orderDetailCtrl', function($scope, $log, $location, orderMgr, $stateParams, $timeout, $state, processOneLocationMgr, orderId) {

    $scope.order = {};
    $scope.mobile_number;
    $scope.isOrderShown = false;
    $scope.orderId = orderId;
    $scope.productList = [];
    $scope.orderPlanDeliveryList = [];
    $scope.customer_name;
    $scope.showProductOrDeliveryPlan = 'showOrder';
    $scope.allCustomers = [];
    $scope.customerSelected;
    $scope.showOrderMenu;
    $scope.allOrderProducts = [];
    $scope.customer_id;
    $scope.order_date;
    $scope.orderErrorMsg = '';
    $scope.orderPlanErrorMsg = '';
    $scope.orderTransactionList = [];
    $scope.billing_name;



    $scope.getOrder = function(orderId) {
        orderMgr.getOrderById(orderId, function(orderDetails) {
            $scope.order = orderDetails.order;
        });
    }
    $scope.getOrder($scope.orderId);

    $scope.applyChanges = function() {
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
            $scope.$apply();
    }

    $scope.loadDefaults = function() {
        $scope.showOrderMenu = false;
        orderMgr.getAllCustomers(function(data) {
            $.each(data, function(k, v) {
                v.customer.nameNumber = v.customer.name + ', ' + v.customer.mobile_number;
                $scope.allCustomers.push(v.customer);
            });

            if ($scope.orderId == 'new') {} else {
                orderMgr.loadDefaults($scope.orderId, function(orderDetails, customerDetails) {
                    $scope.order = orderDetails.orderProperty.order;
                    $scope.productList = orderDetails.productList;
                    $scope.orderPlanDeliveryList = orderDetails.orderDeliveryPlanList;
                    var cust = orderMgr.getCustomerByIdFromList(orderDetails.orderProperty.order.customer_id, $scope.allCustomers);
                    $scope.mobile_number = cust.mobile_number;
                    $scope.customer_name = cust.name;
                    $scope.billing_name = cust.billing_name;
                    $scope.showOrderMenu = true;
                    $scope.order_date = $scope.order.delivery_date;
                    $scope.customer_id = cust.id;
                    $scope.isOrderShown = true;
                    orderMgr.getOrderProductById($scope.orderId, function(data) {
                        $scope.allOrderProducts = data;
                        if (data.length > 0) {
                            $scope.orderDeliveryPlanTemplate = {
                                order_product_id: angular.copy(data[0].productId),
                                quantity: 0,
                                isEditable: true,
                                delivery_date: '',
                                splittedFromId: ''
                            };
                        }
                        $scope.applyChanges();
                    });
                    processOneLocationMgr.getTransactions($scope.orderId, function(data) {
                        if (data.length > 0) {
                            $scope.orderTransactionList = data;
                        }
                    })

                    $scope.applyChanges();
                });
            }
            $scope.applyChanges();
        });
    }

    $scope.loadDefaults();

    $scope.getProductName = function(productId) {
      var name;
        angular.forEach($scope.productList, function(value, key) {
            if (value.order_product.id === productId){
							name = value.order_product.master_process_name +'-'+ value.order_product.color;
              return;
						}
        });
        return name;
    }


});
