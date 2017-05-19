describe('realizando uma jogada', function () {

    describe('quando jogar a primeira carta', function () {

        it('jogada possui a primeira carta', function () {

        });
        
        it('jogada atual foi iniciada', function () {

        });

        it('a primeira carta foi desvirada', function () {

        });

    });

    describe('quando jogar a segunda carta', function () {

        it('jogada possui segunda carta', function () {

        });

        it('jogada atual foi finalizada', function () {

        });

        it('a segunda carta foi desvirada', function () {

        });

        describe('se as cartas viradas forem iguais', function () {

            it('a primeira carta deve ser removida', function () {

            });

            it('a segunda carta deve ser removida', function () {

            });

            it('a jogada deve ser bem sucedida', function () {
                
            });

        });

        describe('se as cartas forem diferentes', function () {

            it('a primeira carta deve ser virada', function () {

            });

            it('a segunda carta deve ser virada', function () {
                
            });

            it('uma nova jogada deve ser criada', function () {

            });

        });

    });


    // var jogo;

    // beforeEach(function () {
    //     jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
    // });

    // it('ao jogar uma vez a jogada foi iniciada', function () {
    //     jogo.joga(0, 0);
    //     expect(jogo.recuperaJogadaAtual().iniciada).to.be.true;
    // });

    // it('ao jogar pela segunda vez a jogada foi finalizada', function () {
    //     jogo.joga(0, 0);
    //     jogo.joga(0, 1);
    //     expect(jogo.recuperaJogadaAtual().iniciada).to.be.false;
    // });

    // it('ao jogar pela segunda vez as duas cartas foram viradas', function () {
    //     jogo.joga(0, 0);
    //     jogo.joga(0, 1);
    //     expect(jogo.recuperaJogadaAtual().iniciada).to.be.false;
    // });

    // it('ao jogar pela segunda vez ambas, se forem iguais ambas vão apagar senao ambas vão virar', function () {
    //     jogo.joga(0, 0);
    //     jogo.joga(0, 1);

    //     if (jogo.recuperaJogadaAtual().primeiraCarta.nome == jogo.recuperaJogadaAtual().segundaCarta.nome) {
    //         expect(jogo.recuperaJogadaAtual().primeiraCarta.apagada).to.be.true;
    //         expect(jogo.recuperaJogadaAtual().segundaCarta.apagada).to.be.true;
    //     } else {
    //         expect(jogo.recuperaJogadaAtual().primeiraCarta.escondida).to.be.true;
    //         expect(jogo.recuperaJogadaAtual().segundaCarta.escondida).to.be.true;
    //     }

    // });
});