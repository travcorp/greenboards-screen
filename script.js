(function () {
  'use strict';
  var app = angular.module('examples', []);

  app.controller('BarCtrl', ['$scope','$http','$interval', function ($scope, $http, $interval) {
 
	
	updateData();
	$interval(function () {
      updateData();
    }, 5 * 60 * 1000);

	function updateData(){
		$http({
			method: 'GET',
			url: 'https://hsgfjonc3m.execute-api.eu-west-1.amazonaws.com/prod/boardscores'
		}).then(function (response) {
			if (response.data){
				
				var cyberForceScore, centerForwardsScore, dramaSquatsScore = 0;
				
				for (var i = 0; i < response.data.length; i++){
					if (response.data[i].team == "CenterForwards"){
						centerForwardsScore = response.data[i].score
					}
					if (response.data[i].team == "CyberForce"){
						cyberForceScore = response.data[i].score
					}
					if (response.data[i].team == "DramaSquats"){
						dramaSquatsScore = response.data[i].score
					}
				}

				$scope.scores = {
					centerForwards: centerForwardsScore,     
					cyberForce: cyberForceScore,
					dramaSquats: dramaSquatsScore
				};
			}	
			
		}, function (error) {
			console.log('Error:' + error);
		});
	}
  }]);
})();
