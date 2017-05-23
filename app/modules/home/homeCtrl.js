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


		vm.jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));

		vm.showAlert = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			// Modal dialogs should fully cover application
			// to prevent interaction outside of dialog
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('This is an alert title')
					.textContent('You can specify some description text in here.')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(ev)
			);
		};


		function Jogo(tabuleiro) {
			var self = this;

			self.tabuleiro = tabuleiro;

			self.jogadaAtual = null;

			self.isAcabado = function () {
				for (var row = 0; row < self.tabuleiro.matriz.length; row++) {
					for (var col = 0; col < self.tabuleiro.matriz[row].length; col++) {
						if (!self.tabuleiro.matriz[row][col].apagada) {
							return false;
						};
					};
				};
				return true;
			};


			self.inicia = function () {
				self.tabuleiro.posicionaCartas();
			};

			self.joga = function (x, y) {

				if (!self.isAcabado()) {
					if (!self.jogadaAtual) {
						self.jogadaAtual = new Jogada();
					}

					if (self.jogadaAtual.segundaCarta && self.jogadaAtual.primeiraCarta) {
						self.jogadaAtual.segundaCarta.vira();
						self.jogadaAtual.primeiraCarta.vira();
						self.jogadaAtual = new Jogada();
					}

					if (!self.jogadaAtual.primeiraCarta) {
						self.jogadaAtual.primeiraCarta = self.recuperaCarta(x, y);

						self.jogadaAtual.primeiraCarta.desvira();

						self.jogadaAtual.iniciada = true;

					} else if (!self.jogadaAtual.segundaCarta) {
						self.jogadaAtual.segundaCarta = self.recuperaCarta(x, y);

						self.jogadaAtual.segundaCarta.desvira();

						self.jogadaAtual.iniciada = false;

						if (self.jogadaAtual.segundaCarta.nome === self.jogadaAtual.primeiraCarta.nome) {
							self.jogadaAtual.bemSucedida = true;
							self.jogadaAtual.segundaCarta.apaga();
							self.jogadaAtual.primeiraCarta.apaga();
						} else {
							self.jogadaAtual.bemSucedida = false;
						}
					}
				} else {
					self.acabou = true;
				};
			};

			self.recuperaCarta = function (x, y) {
				return self.tabuleiro.recuperaCarta(x, y);
			};

			self.recuperaJogadaAtual = function () {
				return self.jogadaAtual;
			};

			self.inicia();
		}

		function Jogada() {
			var self = this;

			self.primeiraCarta = null;
			self.segundaCarta = null;
			self.iniciada = false;
			self.bemSucedida = false;

		}

		function Carta(nome, url) {
			var self = this;

			self.urlVirada = '/app/assets/images/back.png';

			self.url = url;
			self.nome = nome;
			self.imagem = '';
			self.virada = true;
			self.apagada = false;
			self.linha = null;
			self.coluna = null;

			self.toString = function () {
				return self.nome;
			};

			self.desvira = function () {
				self.virada = false;
			};

			self.vira = function () {
				self.virada = true;
			};

			self.apaga = function () {
				self.apagada = true;
			}

		}

		function Tabuleiro(cartas, posicionadorDeCartas) {
			var self = this;

			self.qtdLinhas = 4;
			self.qtdColunas = 4;
			self.matriz = null;

			self.posicionadorDeCartas = posicionadorDeCartas;

			self.posicionaCartas = function () {
				self.matriz = self.posicionadorDeCartas.sorteiaCartas(cartas, self.qtdLinhas, self.qtdColunas);
			};

			self.recuperaCarta = function (x, y) {
				return self.matriz[x][y];
			};
		}

		function PosicionadorDeCartas() {
			var self = this;

			self.sorteiaCartas = function (cartas, qtdLinhas, qtdColunas) {
				var matriz = new Array();

				for (var row = 0; row < qtdLinhas; row++) {
					for (var col = 0; col < qtdColunas; col++) {
						if (!(matriz[row] instanceof Array)) {
							matriz[row] = new Array();
						}

						var random = Math.floor(Math.random() * cartas.length);
						var carta = cartas[random];
						carta.linha = row;
						carta.coluna = col;
						matriz[row].push(carta);
						cartas.splice(random, 1)[0];
					};
				};

				return matriz;
			}
		}

		function criaCartas() {
			return [
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
		};

	}

})();


