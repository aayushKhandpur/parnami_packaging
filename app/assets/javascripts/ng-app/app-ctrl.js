parnamiPackaging.controller('HomeCtrl', function ($scope,$http,utilitySrv,$location) {

		$scope.isUserLoggedIn = true;// will be covered by Anirudh Sir
		var objList = utilitySrv.getLinkedObject();
		if($scope.isUserLoggedIn) {
			objList.add($location.absUrl());
			if($location.absUrl().indexOf('#') == -1)
				$location.path('/index');
		}
        
    });