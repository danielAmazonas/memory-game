/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Array de figuras padrão
/*const figures = [
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>'
];*/

// Array de figuras Street Fighter II
const figuresSF = [
    '<li class="card"><img class="ryu img-responsive" src="img/ryu.png" alt="Ryu"></li>',
    '<li class="card"><img class="ken img-responsive" src="img/ken.png" alt="Ken"></li>',
    '<li class="card"><img class="guile img-responsive" src="img/guile.png" alt="Guile"></li>',
    '<li class="card"><img class="blanka img-responsive" src="img/blanka.png" alt="Blanka"></li>',
    '<li class="card"><img class="dhalsin img-responsive" src="img/dhalsin.png" alt="Dhalsin"></li>',
    '<li class="card"><img class="zangief img-responsive" src="img/zangief.png" alt="Zangief"></li>',
    '<li class="card"><img class="e-honda img-responsive" src="img/e-honda.png" alt="E-Honda"></li>',
    '<li class="card"><img class="chun-li img-responsive" src="img/chun-li.png" alt="Chun-Li"></li>',
    '<li class="card"><img class="ryu img-responsive" src="img/ryu.png" alt="Ryu"></li>',
    '<li class="card"><img class="ken img-responsive" src="img/ken.png" alt="Ken"></li>',
    '<li class="card"><img class="guile img-responsive" src="img/guile.png" alt="Guile"></li>',
    '<li class="card"><img class="blanka img-responsive" src="img/blanka.png" alt="Blanka"></li>',
    '<li class="card"><img class="dhalsin img-responsive" src="img/dhalsin.png" alt="Dhalsin"></li>',
    '<li class="card"><img class="zangief img-responsive" src="img/zangief.png" alt="Zangief"></li>',
    '<li class="card"><img class="e-honda img-responsive" src="img/e-honda.png" alt="E-Honda"></li>',
    '<li class="card"><img class="chun-li img-responsive" src="img/chun-li.png" alt="Chun-Li"></li>'
];

/**
 * @description Montar o Deck de modo randomico
 *  */
function montar() {
    let temp = shuffle(figuresSF);
    for (let i = 0; i < figuresSF.length; i++) {
        $('.deck').append(temp[i]);
    }
}

// Chama o método montar
montar();

// Variáveis de controle
let open = []; // classe da carta
let fig1, fig2; // carta1 e carta2
let temp = 0; // conta cliques para atribuir valor a carta
let move = 0; // qtd movimentos
let segundos = 0; // tempo
let parar; // parar tempo
const fecharCarta = 1550; // tempo para fechar a carta
let cartas = 0;
let estrelas = 3;

/**
 * @description Função para abrir carta
 * @param {HTMLElement} figura 
 * @param {number} posicao 
 */
function abrirCarta(figura, posicao) {
    figura.addClass('open show');
    open[posicao] = figura.children().attr('class');
}

/**
 * @description Função para setar classes css se acertar
 * @param {HTMLElement} figura1 
 * @param {HTMLElement} figura2 
 */
function acerto(figura1, figura2) {
    figura1.toggleClass('open show');
    figura2.toggleClass('open show');
    figura1.addClass('match');
    figura2.addClass('match');
    open.pop();
    open.pop();
}

/**
 * @description Função para setar classess css se errar
 * @param {HTMLElement} figura1 
 * @param {HTMLElement} figura2 
 */
function erro(figura1, figura2) {
    figura1.toggleClass('open show');
    figura2.toggleClass('open show');
    figura1.addClass('error');
    figura2.addClass('error');
    open.pop();
    open.pop();
}

/**
 * @description Função para fechar as cartas se errar
 * @param {HTMLElement} figura1 
 * @param {HTMLElement} figura2 
 */
function fechar(figura1, figura2) {
    figura1.toggleClass('error');
    figura2.toggleClass('error');
}

/**
 * @description Função para contar movimentos
 */
function contar() {
    move++;
    $('.moves').text(move);
}

/**
 * @description Função para remover estrelas
 */
function removerEstrela() {
    var li;
    li = $('.stars').children('ul li:first');
    li.remove();
    estrelas--;
}

/**
 * @description Função que chama o modal ao acertar todas as cartas
 */
function concluir() {
    clearInterval(parar);
    document.getElementById('linkResultado').click();
    $('#pontuacao').text('With ' + move + ' Moves and ' + estrelas + ' Stars in ' + segundos + ' seconds.');
}

/**
 * @description Função que cronometra a partida
 */
function tempo() {
    var el = $('#time');

    function incrementarTempo() {
        segundos += 1;
        el.text(segundos + ' seconds.');
    }
    // Variável parar parar o tempo
    parar = setInterval(incrementarTempo, 1000);
}

// Chama o método tempo
tempo();

/**
 * @description Ação do reload
 */
$('.restart').click(function() {
    location.reload();
});

/**
 * @description Ação do play again
 */
$('#playAgain').click(function() {
    location.reload();
});

/**
 * @description Ação do clique nas cartas
 */
$('ul').on('click', 'li', function() {
    // Contar movimentos
    contar();

    // Condição de movimentos, 32 remove uma estrela, 40 outra e 50 a última
    if (move === 32) {
        removerEstrela();
    } else if (move === 40) {
        removerEstrela();
    } else if (move === 50) {
        removerEstrela();
    }
    
    // Usa a varável temp para saber se é a primeira carta ou a segunda
    if (temp === 0) {
        fig1 = $(this);
        abrirCarta(fig1, 0);
        temp++;
    } else {
        fig2 = $(this);
        abrirCarta(fig2, 1);
        temp--;
        $('li').css('pointer-events', 'none');
        setTimeout(function() {
            if (open[0] != open[1]) {
                erro(fig1, fig2);
                setTimeout(function() {
                    fechar(fig1, fig2);
                    $('li').css('pointer-events', 'auto');
                }, fecharCarta);
            } else {
                acerto(fig1, fig2);
                fig1.click(false);
                fig2.click(false);
                $('li').css('pointer-events', 'auto');
                cartas++;
            }
            
            // Condição de fim de jogo
            if (cartas == 8) {
                concluir();
            }
        }, 1550);
    }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
