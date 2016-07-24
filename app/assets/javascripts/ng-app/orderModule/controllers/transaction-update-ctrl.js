orderModule.controller('TransactionUpdateCtrl', function ($scope,transaction,$modal,$modalInstance) {

console.log(transaction);

$scope.cancel = function() {
    $modalInstance.dismiss();
};

});
