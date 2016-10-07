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
				const minTop = 45;
				const maxTop = 5;
				
				var results = response.data;

				//var cfwTop = 
				//
				var tops = {
					CenterForwards : 0,
					CyberForce: 0,
					DramaSquats: 0
				}

				// tops[resuls.max(m => m.score).name] = maxTop
				// 

				$scope.teams = [
					{ name: 'CenterForwards', label: 'CFW', score: findTeamByName('CenterForwards').score, top: maxTop, color: '#48a771' },    
					{ name: 'CyberForce', label: 'CYF', score: findTeamByName('CyberForce').score, top: 25, color: '#4881a7' },
					{ name: 'DramaSquats', label: 'DSQ', score: findTeamByName('DramaSquats').score, top: minTop, color: '#a75248' }
				];
			}

			function findTeamByName(name) {
				return results.find((team) => { return team.team === name});
			}	

			function getMaxScore() {

			}
			
		}, function (error) {
			console.log('Error:' + error);
		});
	}
  }]);
})();
