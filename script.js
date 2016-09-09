(function () {
  'use strict';
  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

  app.config(function (ChartJsProvider) {    
  
  });

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
				
				var cyberSourceScore;
				var centerForwardsScore;
				var dramaSqatsScore;
				
				for (var i = 0; i < response.data.length; i++){
					if (response.data[i].team == "CenterForwards"){
						centerForwardsScore = response.data[i].score
					}
					if (response.data[i].team == "CyberForce"){
						cyberSourceScore = response.data[i].score
					}
					if (response.data[i].team == "DramaSquats"){
						dramaSqatsScore = response.data[i].score
					}
				}				
				$scope.data = [      
					[centerForwardsScore, cyberSourceScore, dramaSqatsScore]
				];
			}	
			
		}, function (error) {
			console.log('Error:' + error);
		});
	}
	Chart.defaults.global.defaultFontSize = 45;
		
	$scope.options = {
		animation: {
			duration: 0,
			onComplete: function () {
				// render the value of the chart above the bar
				var ctx = this.chart.ctx;
				ctx.font = Chart.helpers.fontString(30, 'normal', Chart.defaults.global.defaultFontFamily);
				ctx.fillStyle = this.chart.config.options.defaultFontColor;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'bottom';
				this.data.datasets.forEach(function (dataset) {
					for (var i = 0; i < dataset.data.length; i++) {
						var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
						
						// If the bar is too high score should be displayed inside the box, otherwise it will be cutted of.
						var scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
						var y_pos = model.y - 5;								
						if ((scale_max - model.y) / scale_max >= 0.93)
                            y_pos = model.y + 45; 
						
						ctx.fillText(dataset.data[i], model.x, y_pos);
					}
				});
			}
		},		
		legend: { 
			display: false 
		},
		tooltips: {
			enabled: false
		},
		scales: {
			scaleLabel:{
					fontSize: 60
				},
			xAxes: [{
				gridLines:{
					display: false
				},
				
			}],
			yAxes: [{			
				display: false,				
				ticks:{
					min: 0,
					beginAtZero: true
				}
			}]
		}		
	};
    $scope.labels = ['CenterForwards', 'CyberForce', 'DramaSquats'];
    $scope.series = ['Series A'];   
	$scope.colours = ['#00ff99'];
  }]);
})();
