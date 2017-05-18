describe('dado um jogo da memória', function () {

    function Jogo() {
        var self = this;

        self.cartas = [
            new Carta('ball'),
            new Carta('ball'),
            new Carta('potato'),
            new Carta('potato'),
            new Carta('dinosaur'),
            new Carta('dinosaur'),
            new Carta('kronos'),
            new Carta('kronos'),
            new Carta('rocket'),
            new Carta('rocket'),
            new Carta('unicorn'),
            new Carta('unicorn'),
            new Carta('guy'),
            new Carta('guy'),
            new Carta('zeppelin'),
            new Carta('zeppelin')
        ];

        self.tabuleiro = new Tabuleiro(self.cartas);

        self.jogadaAtual = null;

        self.inicia = function () {
            self.tabuleiro.posicionaCartas();
        };

        self.joga = function (x, y) {
            if (!self.jogadaAtual) {
                self.jogadaAtual = new Jogada();
            }

            if (self.jogadaAtual.segundaCarta && self.jogadaAtual.primeiraCarta) {
                self.jogadaAtual = new Jogada();
            }

            if (!self.jogadaAtual.primeiraCarta) {
                self.jogadaAtual.primeiraCarta = self.recuperaCarta(x, y);
                console.log(self.jogadaAtual.primeiraCarta.nome + ' PRIMEIRA CARTA');

                self.jogadaAtual.primeiraCarta.desvira();

                self.jogadaAtual.iniciada = true;

            } else if (!self.jogadaAtual.segundaCarta) {
                self.jogadaAtual.segundaCarta = self.recuperaCarta(x, y);

                self.jogadaAtual.segundaCarta.desvira();

                self.jogadaAtual.iniciada = false;

                self.jogadaAtual.primeiraCarta.vira();

                self.jogadaAtual.segundaCarta.vira();

                if (self.jogadaAtual.segundaCarta.nome == self.jogadaAtual.primeiraCarta.nome) {
                    self.jogadaAtual.bemSucedida = true;
                    self.jogadaAtual.segundaCarta.apaga();
                    self.jogadaAtual.primeiraCarta.apaga();
                }

            }

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

    function Carta(nome, id) {
        var self = this;

        self.nome = nome;
        self.imagem = '';
        self.escondida = true;
        self.apagada = false;
        self.linha = null;
        self.coluna = null;

        self.toString = function () {
            return self.nome;
        };

        self.desvira = function () {
            self.escondida = false;
        };

        self.vira = function () {
            self.escondida = true;
        };

    }

    function Tabuleiro(cartas) {
        var self = this;

        self.qtdLinhas = 4;
        self.qtdColunas = 4;

        self.matriz = [
            [], [], [], []
        ];

        self.posicionaCartas = function () {
            for (var row = 0; row < self.qtdLinhas; row++) {
                for (var col = 0; col < self.qtdColunas; col++) {
                    var random = Math.floor(Math.random() * cartas.length);
                    var carta = cartas[random];
                    carta.linha = row;
                    carta.coluna = col;
                    self.matriz[row][col] = carta;
                    cartas.splice(random, 1)[0];
                };
            };
        };

        self.recuperaCarta = function (x, y) {
            return self.matriz[x][y];
        };

        self.apagaCarta = function (x, y) {
            self.matriz[x][y] = null;
        };
    }

    describe('um excelente jogo', function () {
        var jogo;

        beforeEach(function () {
            jogo = new Jogo();
        });

        it('possui um tabuleiro', function () {
            expect(jogo).to.have.ownProperty('tabuleiro');
        });

        it('possui cartas', function () {
            expect(jogo).to.have.ownProperty('cartas');
        });

    });


    describe('uma Carta', function () {
        var carta;

        beforeEach(function () {
            carta = new Carta();
        });

        it('possui um nome', function () {
            expect(carta).to.have.ownProperty('nome');
        });

        it('possui uma imagem', function () {
            expect(carta).to.have.ownProperty('imagem');
        });

        it('possui um estado', function () {
            expect(carta).to.have.ownProperty('escondida');
        });

    });

    describe('um lindo Tabuleiro', function () {
        var tabuleiro;

        beforeEach(function () {
            tabuleiro = new Tabuleiro();
        });

        it('possui linhas', function () {
            expect(tabuleiro).to.have.ownProperty('qtdLinhas');
        });

        it('possui colunas', function () {
            expect(tabuleiro).to.have.ownProperty('qtdColunas');
        });
    });

    describe('uma competente jogada', function () {
        var jogada;

        beforeEach(function () {
            jogada = new Jogada();
        });

        it('possui uma primeira carta', function () {
            expect(jogada).to.have.ownProperty('primeiraCarta');
        });

        it('possui uma segunda carta', function () {
            expect(jogada).to.have.ownProperty('segundaCarta');
        });

        it('possui um estado(iniciada / terminada)', function () {
            expect(jogada).to.have.ownProperty('iniciada');
        });

        it('pode ser bem sucedida)', function () {
            expect(jogada).to.have.ownProperty('bemSucedida');
        });
    });

    describe('quando iniciar o jogo', function () {
        var jogo;

        beforeEach(function () {
            jogo = new Jogo();
        });

        it('distribui as cartas', function () {
            expect(jogo.recuperaCarta(0, 0)).to.be.instanceOf(Carta);
        });

        describe('realizando uma nobre jogada', function () {

            it('ao jogar uma vez a jogada foi iniciada', function () {
                jogo.joga(0, 0);
                expect(jogo.recuperaJogadaAtual().iniciada).to.be.true;
            });

            it('ao jogar pela segunda vez a jogada foi finalizada', function () {
                jogo.joga(0, 0);
                jogo.joga(0, 1);
                expect(jogo.recuperaJogadaAtual().iniciada).to.be.false;
            });

            it('ao jogar pela segunda vez as duas cartas foram viradas', function () {
                jogo.joga(0, 0);
                jogo.joga(0, 1);
                expect(jogo.recuperaJogadaAtual().iniciada).to.be.false;
            });

            it('ao jogar pela segunda vez ambas, se forem iguais ambas vão apagar senao ambas vão virar', function () {
                jogo.joga(0, 0);
                jogo.joga(0, 1);

                if (jogo.recuperaJogadaAtual().primeiraCarta.nome == jogo.recuperaJogadaAtual().segundaCarta.nome) {
                    expect(jogo.recuperaJogadaAtual().primeiraCarta.apagada).to.be.true;
                    expect(jogo.recuperaJogadaAtual().segundaCarta.apagada).to.be.true;
                } else {
                    expect(jogo.recuperaJogadaAtual().primeiraCarta.escondida).to.be.true;
                    expect(jogo.recuperaJogadaAtual().segundaCarta.escondida).to.be.true;
                }

            });


        });
    });
});