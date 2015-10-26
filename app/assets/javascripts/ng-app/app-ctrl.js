parnamiPackaging.controller('HomeCtrl', function ($scope,$http,utilitySrv,$location) {


		var objList = utilitySrv.getLinkedObject();
		objList.add($location.absUrl());
		
		$location.path('/');
        
    });