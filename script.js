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
				var results = response.data;
                var maxScore = _.maxBy(response.data, function(team) { return team.score; }).score;
                var minScore = _.minBy(response.data, function(team) { return team.score; }).score;
                
				var tops = {
					CenterForwards : getPosition(findTeamByName('CenterForwards').score, maxScore, minScore),
					CyberForce: getPosition(findTeamByName('CyberForce').score, maxScore, minScore),
					DramaSquats: getPosition(findTeamByName('DramaSquats').score, maxScore, minScore)
				}

				$scope.teams = [
					{ name: 'CenterForwards', label: 'CFW', score: findTeamByName('CenterForwards').score, top: tops.CenterForwards, color: 'blue' },    
					{ name: 'CyberForce', label: 'CYF', score: findTeamByName('CyberForce').score, top: tops.CyberForce, color: 'green' },
					{ name: 'DramaSquats', label: 'DSQ', score: findTeamByName('DramaSquats').score, top: tops.DramaSquats, color: 'red' }
				];
			}

			function findTeamByName(name) {
				return results.find((team) => { return team.team === name}) || {score: 0, team: name, month: ""};
			}	

			function getPosition(score, maxScore, minScore) {
                var windowHeight = window.innerHeight;
                var rockerHeight = 400;
				var lowBoundary = windowHeight - rockerHeight - 100;
				var highBoundary = 30;
                
                return lowBoundary + (highBoundary - lowBoundary) * score/((maxScore-minScore)||1)
			}
			
		}, function (error) {
			console.log('Error:' + error);
		});
	}
  }]);
})();
