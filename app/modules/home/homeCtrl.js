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

	Home.$inject = ['homeService', '$timeout'];

	function Home(homeService, $timeout) {

		var vm = this;
		vm.title = "Hello, memory-game!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

		vm.tabuleiro = new Tabuleiro();

		vm.jogadaAtual = null;

		vm.grid = [];

		vm.cartas = [
			new Carta('ball', '/app/assets/images/8-ball.png'),
			new Carta('ball', '/app/assets/images/8-ball.png'),
			new Carta('potato', '/app/assets/images/baked-potato.png'),
			new Carta('potato', '/app/assets/images/baked-potato.png'),
			new Carta('dinosaur', '/app/assets/images/dinosaur.png'),
			new Carta('dinosaur', '/app/assets/images/dinosaur.png'),
			new Carta('kronos', '/app/assets/images/kronos.png'),
			new Carta('kronos', '/app/assets/images/kronos.png'),
			new Carta('rocket', '/app/assets/images/rocket.png'),
			new Carta('rocket', '/app/assets/images/rocket.png'),
			new Carta('unicorn', '/app/assets/images/skinny-unicorn.png'),
			new Carta('unicorn', '/app/assets/images/skinny-unicorn.png'),
			new Carta('guy', '/app/assets/images/that-guy.png'),
			new Carta('guy', '/app/assets/images/that-guy.png'),
			new Carta('zeppelin', '/app/assets/images/zeppelin.png'),
			new Carta('zeppelin', '/app/assets/images/zeppelin.png')
		];

		vm.inicia = function () {
			for (var row = 0; row < vm.tabuleiro.qtdLinhas; row++) {
				for (var col = 0; col < vm.tabuleiro.qtdColunas; col++) {
					var ramdom = Math.floor(Math.random() * vm.cartas.length);
					var carta = vm.cartas[ramdom];
					carta.setRow(row);
					carta.setCol(col);
					vm.grid.push(carta);
					vm.tabuleiro.matriz[row][col] = carta;
					vm.cartas.splice(ramdom, 1)[0];
				}
			}
			console.log(vm.grid);
		};

		vm.joga = function (carta) {
			if (!vm.jogadaAtual) {
				vm.jogadaAtual = new Jogada();
			}

			if (!vm.jogadaAtual.primeiraCarta) {
				vm.jogadaAtual.primeiraCarta = carta;
				console.log(vm.jogadaAtual.primeiraCarta.nome + ' PRIMEIRA CARTA');
				vm.jogadaAtual.primeiraCarta.desvira();
				vm.jogadaAtual.iniciada = true;
			} else if (!vm.jogadaAtual.segundaCarta) {
				vm.jogadaAtual.segundaCarta = carta;
				console.log(vm.jogadaAtual.segundaCarta.nome + ' SEGUNDA CARTA');
				vm.jogadaAtual.segundaCarta.desvira();
				vm.jogadaAtual.iniciada = false;
				var index = vm.grid.indexOf(vm.jogadaAtual.primeiraCarta);
				var index1 = vm.grid.indexOf(vm.jogadaAtual.segundaCarta);
				if (vm.jogadaAtual.segundaCarta.nome == vm.jogadaAtual.primeiraCarta.nome) {
					vm.jogadaAtual.bemSucedida = true;
					vm.grid[index].apagada = true;
					vm.grid[index1].apagada = true;
					console.log("parabens!!");
				} else {
					$timeout(vm.grid[index].vira, 2000);
					$timeout(vm.grid[index1].vira, 2000);
				}

				vm.jogadaAtual = new Jogada();
			}

		};

		vm.recuperaCarta = function (x, y) {
			return vm.tabuleiro.recuperaCarta(x, y);
		};

		vm.recuperaJogadaAtual = function () {
			return vm.jogadaAtual;
		};

		vm.inicia();

		function Jogada() {
			var self = this;

			self.primeiraCarta = null;
			self.segundaCarta = null;
			self.iniciada = false;
			self.bemSucedida = false;

		}

		function Carta(nome, imagem) {
			var self = this;

			self.urlVirada = '/app/assets/images/back.png';

			self.nome = nome;
			self.imagem = imagem;
			self.escondida = true;
			self.apagada = false;
			self.row = null;
			self.col = null;

			self.setRow = function (row) {
				self.row = row;
			};

			self.setCol = function (col) {
				self.col = col;
			};

			self.toString = function () {
				return self.nome;
			};

			self.desvira = function () {
				self.escondida = false;
				self.urlVirada = self.imagem;
			};

			self.vira = function () {
				self.escondida = true;
				self.urlVirada = '/app/assets/images/back.png';
			};

			self.apaga = function () {
				self.apagada = true;
				self.urlVirada = null;
			};
		}

		function Tabuleiro() {
			var self = this;

			self.qtdLinhas = 4;
			self.qtdColunas = 4;

			self.matriz = [
				[], [], [], []
			];

			self.recuperaCarta = function (x, y) {
				return self.matriz[x][y];
			};
		}

	}

})();


