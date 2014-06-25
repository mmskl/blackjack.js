function Hand() {
    this.cards = [];
};


Hand.prototype.total = function () {
    console.log('getting total');

    var score = 0;
    var ace = 0;

    for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].displayValue == 'ace') {
            ace++
        }
        score += this.cards[i].value;
    }

    while (ace > 0) {

        if (score > 21) {
            score = score - 10;
        }
        ace--;
    }



    return score;
};


Hand.prototype.dealCard = function (card) {
    
    this.cards.push(card);
    
};


function Table(dealer, decksAmount) {
    this.deck = new Deck(decksAmount);
    this.dealer = dealer;
    this.players = [];

};

Table.prototype.isBust = function(name) {
	return this.players[name].total() > 21;
}

Table.prototype.getParticularCard = function(name, which) {
	return this.players[name].cards[which];
}


Table.prototype.startGame = function(twoCardsToDealer) {

    if(twoCardsToDealer != false)  {
        this.players[this.dealer].dealCard(this.deck.getCard());
        this.players[this.dealer].dealCard(this.deck.getCard());
    }
    



};

Table.prototype.dealCard = function(name) {

    this.players[name].dealCard(this.deck.getCard());


};

Table.prototype.getScore = function(name) {

    this.players[name].total();


};




Table.prototype.addPlayer = function(user, tokens){

        var player = new Hand();
        this.players[user] = player;

};


exports.Table = Table;


function Card(displayValue, suit, value) {
    this.displayValue = displayValue;
    this.suit = suit;
    this.value = value;
}



function deckGenerator(howManyDecksOfCards) {


    var values = {'ace' : 11, '2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'jack' : 10, 'queen' : 10, 'king' : 10};

    var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    var deck = [];
    card = '';

    for (var d = 0; d < howManyDecksOfCards; d++) {
        for (card in values) {

            for (var s = 0; s < suits.length; s++) {

                deck.push(new Card(card, suits[s], values[card]));
            }
        }
    }
    console.log('generuje');
    console.log(howManyDecksOfCards);
    return shuffle(deck);
}


function Deck(howManyDeckOfCards) {
    console.log('creating new deck');
    this.deckStack = deckGenerator(howManyDeckOfCards);
}

Deck.prototype.shuffle = function () {
    this.deckStack = shuffle(this.deckStack);
};

Deck.prototype.getCard = function () {
    var card = this.deckStack.pop();
    console.log('Dealer has remaining cards: ' + this.deckStack.length);
    return card;
};






shuffle = function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};