orderModule.controller('TransactionUpdateCtrl', function($scope, transaction, $modal, $modalInstance, $http) {

    $scope.transaction = transaction.order_transaction;

    $scope.saveTransaction = function() {
        $scope.transaction.status = "Completed";
        $scope.transaction.quantity_transfered = $scope.transaction.quantity_forwarded - $scope.transaction.quantity_waste;
        var httpRequest = $http.put('/order_transactions/' + $scope.transaction.id, $scope.transaction);
        httpRequest.success(function(data) {
          var new_transaction = {};
            var new_transaction = $scope.transaction;
            if($scope.transaction.quantity_transfered > 0){
              new_transaction.quantity_recieved = $scope.transaction.quantity_transfered;
              new_transaction.quantity_waste = 0;
              new_transaction.quantity_forwarded = 0;
              new_transaction.status = "In Process";
              new_transaction.quantity_transfered = 0;
              var httpRequest = $http.post('/order_transactions/', new_transaction);
              httpRequest.success(function(data) {
                console.log(data);
              });
            }

            $modalInstance.close($scope.transaction);
        });
        httpRequest.error(function(data) {
            console.log(data);
        });

    }

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };

});
