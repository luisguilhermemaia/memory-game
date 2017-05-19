describe('realizando uma jogada', function () {

    describe('quando jogar a primeira carta', function () {
        describe('e for a primeira jogada', function () {
            var jogo;

            beforeEach(function () {
                jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
                jogo.joga(0, 0);
            });

            it('jogada possui a primeira carta', function () {
                expect(jogo.jogadaAtual.primeiraCarta).not.to.be.null;
            });

            it('jogada atual foi iniciada', function () {
                expect(jogo.jogadaAtual.iniciada).to.be.true;
            });

            it('a primeira carta foi desvirada', function () {
                expect(jogo.jogadaAtual.primeiraCarta.virada).to.be.false;
            });
        });

        describe('e for qualquer outra jogada', function () {
            var jogo;

            beforeEach(function () {
                jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
                jogo.joga(0, 0);
                jogo.joga(0, 1);
                jogo.joga(0, 2);
            });

            it('primeira carta da jogada anterior será virada', function(){
                expect(jogo.recuperaCarta(0, 0).virada).to.be.true;
            });

            it('segunda carta da jogada anterior será virada', function(){
                expect(jogo.recuperaCarta(0, 1).virada).to.be.true;
            });

        });

    });


    describe('quando jogar a segunda carta', function () {
        var jogo;

        beforeEach(function () {
            jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
            jogo.joga(0, 0);
            jogo.joga(0, 1);
        });

        it('jogada possui segunda carta', function () {
            expect(jogo.jogadaAtual.segundaCarta).not.to.be.null;
        });

        it('jogada atual foi finalizada', function () {
            expect(jogo.jogadaAtual.iniciada).to.be.false;
        });

        it('a segunda carta foi desvirada', function () {
            expect(jogo.jogadaAtual.segundaCarta.virada).to.be.false;
        });

        describe('se as cartas viradas forem iguais', function () {
            var jogoComCartasIguais;

            function PosicionadorDeCartasDummy() {
                var self = this;

                self.sorteiaCartas = function () {
                    return [[new Carta('ball')], [new Carta('ball')]];
                };
            };

            beforeEach(function () {
                jogoComCartasIguais = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartasDummy()));
                jogoComCartasIguais.joga(0, 0);
                jogoComCartasIguais.joga(1, 0);
            });

            it('a primeira carta deve ser removida', function () {
                expect(jogoComCartasIguais.jogadaAtual.primeiraCarta.apagada).to.be.true;
            });

            it('a segunda carta deve ser removida', function () {
                expect(jogoComCartasIguais.jogadaAtual.segundaCarta.apagada).to.be.true;
            });

            it('a jogada deve ser bem sucedida', function () {
                expect(jogoComCartasIguais.jogadaAtual.bemSucedida).to.be.true;
            });

            describe('se for o último par o jogo acabou', function () {

                var jogoComCartasFinal;

                function PosicionadorDeCartasFinal() {
                    var self = this;

                    self.sorteiaCartas = function () {
                        return [
                            [new Carta('ball'), new Carta('ball'), new Carta('potato'), new Carta('potato')],
                            [new Carta('dinosaur'), new Carta('dinosaur'), new Carta('kronos'), new Carta('kronos')],
                            [new Carta('rocket'), new Carta('rocket'), new Carta('unicorn'), new Carta('unicorn')],
                            [new Carta('guy'), new Carta('guy'), new Carta('zeppelin'), new Carta('zeppelin')]
                        ];
                    };
                };

                beforeEach(function () {
                    jogoComCartasFinal = new Jogo(new Tabuleiro([], new PosicionadorDeCartasFinal()));

                    jogoComCartasFinal.joga(0, 0);
                    jogoComCartasFinal.joga(0, 1);

                    jogoComCartasFinal.joga(0, 2);
                    jogoComCartasFinal.joga(0, 3);

                    jogoComCartasFinal.joga(1, 0);
                    jogoComCartasFinal.joga(1, 1);

                    jogoComCartasFinal.joga(1, 2);
                    jogoComCartasFinal.joga(1, 3);

                    jogoComCartasFinal.joga(2, 0);
                    jogoComCartasFinal.joga(2, 1);

                    jogoComCartasFinal.joga(2, 2);
                    jogoComCartasFinal.joga(2, 3);

                    jogoComCartasFinal.joga(3, 0);
                    jogoComCartasFinal.joga(3, 1);

                    jogoComCartasFinal.joga(3, 2);
                    jogoComCartasFinal.joga(3, 3);
                });

                it('o jogo acabou', function () {
                    expect(jogoComCartasFinal.acabou()).to.be.true;
                });

            });

            describe('se não for o último par o jogo continua', function () {

                var jogoComCartasInacabado;

                function PosicionadorDeCartasInacabado() {
                    var self = this;

                    self.sorteiaCartas = function () {
                        return [
                            [new Carta('ball'), new Carta('ball'), new Carta('potato'), new Carta('potato')],
                            [new Carta('dinosaur'), new Carta('dinosaur'), new Carta('kronos'), new Carta('kronos')],
                            [new Carta('rocket'), new Carta('rocket'), new Carta('unicorn'), new Carta('unicorn')],
                            [new Carta('guy'), new Carta('guy'), new Carta('zeppelin'), new Carta('zeppelin')]
                        ];
                    };
                };

                beforeEach(function () {
                    jogoComCartasInacabado = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartasInacabado()));

                    jogoComCartasInacabado.joga(0, 0);
                    jogoComCartasInacabado.joga(0, 1);

                    jogoComCartasInacabado.joga(0, 2);
                    jogoComCartasInacabado.joga(0, 3);

                    jogoComCartasInacabado.joga(1, 0);
                    jogoComCartasInacabado.joga(1, 1);

                    jogoComCartasInacabado.joga(1, 2);
                    jogoComCartasInacabado.joga(1, 3);

                    jogoComCartasInacabado.joga(2, 0);
                    jogoComCartasInacabado.joga(2, 1);

                    jogoComCartasInacabado.joga(2, 2);
                    jogoComCartasInacabado.joga(2, 3);

                    jogoComCartasInacabado.joga(3, 0);
                    jogoComCartasInacabado.joga(3, 1);

                });

                it('o jogo continua', function () {
                    expect(jogoComCartasInacabado.acabou()).to.be.false;
                });

            });

        });

        describe('se as cartas forem diferentes', function () {
            var jogoComCartasDiferentes;

            function PosicionadorDeCartasDiferentes() {
                var self = this;

                self.sorteiaCartas = function () {
                    return [[new Carta('ball')], [new Carta('diferente')]];
                };
            };

            beforeEach(function () {
                jogoComCartasDiferentes = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartasDiferentes()));
                jogoComCartasDiferentes.joga(0, 0);
                jogoComCartasDiferentes.joga(1, 0);
            });

            it('a jogada deve ser mal sucedida', function () {
                expect(jogoComCartasDiferentes.jogadaAtual.bemSucedida).to.be.false;
            });

        });

    });

});