orderModule.controller('TransactionUpdateCtrl', function($scope, transaction, $modal, $modalInstance, $http) {

    $scope.transaction = transaction.order_transaction;
    $scope.transactionErrors = null;

    $scope.hideTransactionErrors = function() {
        $scope.transactionErrors = null;
    }


    $scope.saveTransaction = function(form) {
        if (form.$invalid) {
            $scope.formSubmitted = true;
            return;
        }
        if ($scope.transaction.quantity_forwarded > $scope.transaction.quantity_recieved) {
            $scope.transactionErrors = "Quantity Forwarded can't be more than quantity received "
            return;
        }
        if ($scope.transaction.quantity_waste > $scope.transaction.quantity_recieved) {
            $scope.transactionErrors = "Quantity wasted can't be more than quantity received "
            return;
        }
        var check = $scope.transaction.quantity_waste + $scope.transaction.quantity_forwarded;
        if (check > $scope.transaction.quantity_recieved) {
            $scope.transactionErrors = "Quantity forwarded is not valid"
            return;
        }
        $scope.transaction.status = "Completed";
        $scope.transaction.quantity_transfered = $scope.transaction.quantity_forwarded - $scope.transaction.quantity_waste;
        var httpRequest = $http.put('/order_transactions/' + $scope.transaction.id, $scope.transaction);
        httpRequest.success(function(data) {
            $scope.transactionErrors = null;
            var new_transaction = {};
            var new_transaction = $scope.transaction;
            if ($scope.transaction.quantity_transfered > 0) {
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
            var next_transaction = {};

            if ($scope.transaction.quantity_forwarded > 0) {

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


angular.module('AngularRails').config(['valdrProvider', 'NUMBER_REGEXP2', function(valdrProvider, NUMBER_REGEXP2) {

    valdrProvider.addConstraints({
        "TransactionUpdate": {
            'forward': {
                'required': {
                    'message': 'Quantity forwarded is required'
                },
                "pattern": {
                    "value": NUMBER_REGEXP2,
                    "message": "Quantity forwarded is not valid"
                },
                "min": {
                    "value": 1,
                    "message": "Quantity forwarded must not be less than 1"
                }
            },
            "waste": {
                "pattern": {
                    "value": NUMBER_REGEXP2,
                    "message": "Quantity waste is not valid"
                }
            }
        }
    });
}]);
