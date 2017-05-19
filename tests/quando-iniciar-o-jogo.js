describe('quando iniciar o jogo', function () {
    var jogo;

    beforeEach(function () {
        jogo = new Jogo(new Tabuleiro(criaCartas(), new PosicionadorDeCartas()));
    });

    // it('distribui as cartas', function () {
    //     expect(jogo.recuperaCarta(0, 0)).to.be.instanceOf(Carta);
    // });

});