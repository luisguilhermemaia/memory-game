describe('um Jogo da Memória', function () {
    var jogo;

    beforeEach(function () {
        jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
    });

    it('possui Tabuleiro', function () {
        expect(jogo).to.have.ownProperty('tabuleiro');
    });

    describe('um Tabuleiro', function () {
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

    describe('uma jogada', function () {
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

});
