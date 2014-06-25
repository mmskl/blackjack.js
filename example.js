var blackjack = require('./blackjack.js');

// dealer's name, amount of card decks
var table = new blackjack.Table('mamba', 6);
table.addPlayer('mamba', 100);
table.addPlayer('haribo', 99);

//dealer by defaults gets two cards, pass false argument to avoid that
table.startGame();

//get first dealer's card
console.log(table.getParticularCard('mamba', 0));


table.dealCard('haribo');
table.dealCard('haribo');
table.dealCard('haribo');


if(table.isBust('haribo')) {
	console.log('haribo loses');
	console.log('mamba wins');
} else if (table.getScore('mamba') > table.getScore('haribo')) {
	console.log('haribo loses');
	console.log('mamba wins');
} else {
	console.log('mamba loses');
	console.log('haribo wins');	
}


console.log(table.players['mamba'].cards);
console.log(table.players['haribo'].cards);




