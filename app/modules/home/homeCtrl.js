(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('memory-game')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService'];

	function Home(homeService, $scope) {



		var vm = this;
		vm.title = "Hello, memory-game!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();
		
		vm.images = images();


		vm.tiles = function (images) {
			var lista = [];
			images.forEach(function(image){
				image.hide = true;
				image
			})
		}

		function getRandomElement() {
			return array[_.random(0, array.length - 1)];
		}

		function images() {
			var hideSrc = "/app/assets/images/back.png";

			var retorno = {
				ball: {
					src: "/app/assets/images/8-ball.png",
					id: 1,
					hideSrc: hideSrc,
					hide: true
					
				},
				back: {
					src: "/app/assets/images/baked-potato.png",
					id: 2,
					hideSrc: hideSrc,
					hide: true
				},
				potato: {
					src: "/app/assets/images/dinosaur.png",
					id: 3,
					hideSrc: hideSrc,
					hide: true
				},
				kronos: {
					src: "/app/assets/images/kronos.png",
					id: 4,
					hideSrc: hideSrc,
					hide: true
				},
				rocket: {
					src: "/app/assets/images/rocket.png",
					id: 5,
					hideSrc: hideSrc,
					hide: true
				},
				unicorn: {
					src: "/app/assets/images/skinny-unicorn.png",
					id: 6,
					hideSrc: hideSrc,
					hide: true
				},
				guy: {
					src: "/app/assets/images/that-guy.png",
					id: 7,
					hideSrc: hideSrc,
					hide: true
				},
				zeppelin: {
					src: "/app/assets/images/zeppelin.png",
					id: 8,
					hideSrc: hideSrc,
					hide: true
				}
			}
			return retorno;
		};




	}

})();


