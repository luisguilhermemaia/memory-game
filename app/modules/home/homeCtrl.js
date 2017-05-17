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

		vm.images = makeGrid(images());

		function makeGrid(images) {
			var imgArray = [];

			for (var img in images) {
				imgArray.push(images[img]);
			}

			for (var img in images) {
				var obj = images[img];

				obj.pair = obj.id;

				imgArray.push(obj);
			}

			var gridDimension = Math.sqrt(imgArray.length);

			var newObj = [];

			for (var row = 0; row < gridDimension; row++) {
				for (var col = 0; col < gridDimension; col++) {
					var ramdom = Math.floor(Math.random() * imgArray.length);
					imgArray[ramdom].rowspan = row;
					imgArray[ramdom].colspan = col;
					newObj.push(imgArray[ramdom]);
					imgArray.splice(ramdom, 1)[0];
				}
			}
			console.log(newObj);
			return newObj;
		}

		function images() {
			var hideSrc = "/app/assets/images/back.png";

			var retorno = {
				ball: {
					name: "ball",
					src: "/app/assets/images/8-ball.png",
					id: 1,
					hideSrc: hideSrc,
					hide: true

				},
				potato: {
					name: "back",
					src: "/app/assets/images/baked-potato.png",
					id: 2,
					hideSrc: hideSrc,
					hide: true
				},
				dinosaur: {
					name: "potato",
					src: "/app/assets/images/dinosaur.png",
					id: 3,
					hideSrc: hideSrc,
					hide: true
				},
				kronos: {
					name: "kronos",
					src: "/app/assets/images/kronos.png",
					id: 4,
					hideSrc: hideSrc,
					hide: true
				},
				rocket: {
					name: "rocket",
					src: "/app/assets/images/rocket.png",
					id: 5,
					hideSrc: hideSrc,
					hide: true
				},
				unicorn: {
					name: "unicorn",
					src: "/app/assets/images/skinny-unicorn.png",
					id: 6,
					hideSrc: hideSrc,
					hide: true
				},
				guy: {
					name: "guy",
					src: "/app/assets/images/that-guy.png",
					id: 7,
					hideSrc: hideSrc,
					hide: true
				},
				zeppelin: {
					name: "zeppelin",
					src: "/app/assets/images/zeppelin.png",
					id: 8,
					hideSrc: "hideSrc",
					hide: true
				}
			}
			return retorno;
		};

	}

})();


