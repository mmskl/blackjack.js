var options = {};

function Hand(name, sid, tokens) {
    this.playerName = name;
    this.sid = sid;
    this.tokens = tokens;
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

Hand.prototype.isBusted = function () {
    return this.total() > 21;
};

Hand.prototype.dealCard = function (card) {
    this.cards.push(card);
};


function Table(owner, playersLimit, tokensPerCard, decksAmount) {
    this.deck = new Deck(decksAmount);
    this.players = [];
    this.owner = owner;
    this.playersLimit = playersLimit;
    this.tokensPerCard = tokensPerCard;

};

Table.prototype.checkWinner = function() {
    var winners = [];
    var max = 0, cards = 0;

    for (var i = 0; i < this.players.length ; i++) {
        if(this.players[i].total() > 21) continue;

        if(this.players[i].total() > max) {
            winners = [];
            winners.push(this.players[i]);
            max = this.players[i].total();
            cards = this.players[i].cards.length;
        }
        else if (this.players[i].total() == max) {
            if(this.players[i].cards.length < cards) {
                winners = [];
                winners.push(this.players[i]);
            } else if (this.players[i].cards.length == cards) {
                winners.push(this.players[i]);
            }




        }
        this.players[i].cards = [];

    }


    console.log('winners:');
    console.log(winners);

    return winners;
}


Table.prototype.FindByTable = function(user) {
    for(var i =0; i < this.players.length; i++) {
        if(this.players[i].playerName == user) return true;
    }
}


Table.prototype.amount = function(room) {
    var am = 0;
    for(var i=0; i < this.players.length; i++) {
        if(this.players[i].room == room) {
            am++
        }
    }
    return am;

};



Table.prototype.nextRound = function() {

console.log('cardFromDeck');
console.log(this.deck.getCard());


    for(var i=0; i < this.players.length; i++) {

            this.players[i].dealCard(this.deck.getCard());


    }


};




Table.prototype.buyCard = function(name) {


    for(var i=0; i < this.players.length; i++) {


        if( this.players[i].playerName == name) {

            var card = this.deck.getCard();
            this.players[i].dealCard(card);
        }
    }
    return card;

}

Table.prototype.payForCard = function() {

}

Table.prototype.addPlayer = function(user, sid, tokens){


    if (this.players.length <= this.playersLimit ) {

        var player = new Hand(user, sid, tokens);
        this.players.push(player);
    }
};

Table.prototype.userGetsCard = function(user, room) {
    for(var i=0; i < this.players.length; i++) {
        if(this.players[i].room == room && this.players[i].playerName == user) {
            this.players[i].dealCard(this.deck.getCard());
        }

    }
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
    return deck;
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



