//memory game with poker cards
var deck = [];
var suit = ['&spades;', '&clubs;', '&hearts;', '&diams;'];
var card_values = [];
var card_ids = [];
var computer_card_ids = [];
var cards_flipped = 0;
var player_one = 0;
var player_two = 0;
var computer_cache = [];

// keep track and display score
function score(){
	document.getElementById('playerOne').innerHTML = 'Player One: ' + player_one;
	document.getElementById('playerTwo').innerHTML = 'Player Two: ' + player_two;
}

//generate the 52 card deck
function generate(){
	deck = []
	for(var x = 1; x<=13; x++){
		for(var y=0; y<=3; y++){
			if(x === 1){
				deck.push(['A', suit[y]]);
			}else if(x===11){
				deck.push(['J', suit[y]]);
			}else if(x===12){
				deck.push(['Q', suit[y]]);
			}else if(x===13){
				deck.push(['K', suit[y]]);
			}else{
				deck.push([x.toString(), suit[y]]);
			}

		}
	}
}

//A.I for two player
function computerFlipCard(){
	function randCard(){
		rand = Math.floor(Math.random() * 52);
		in_card_ids = false
		good_to_return = false
		return_values = []

		while(good_to_return === false){
			for(var k=0; k<card_ids.length; k++){
				if(rand == card_ids[k]){
					in_card_ids = true;
				} }
			if(in_card_ids === true){
				rand = Math.floor(Math.random() * 52);
				in_card_ids = false;
			} else{
				good_to_return = true;
			}
		}
		return rand;
	}

	function computerAlert(num1,num2){
		alert("the computer has chosen " + num1.toString() + " and " + num2.toString())
	}

	function checkCache(cache, num){
		in_cache = false;
		index = 0
		for(var d=0; d<cache.length; d++){

			console.log('compCache value: ', deck[cache[d]][0]);

			if(deck[num][0]===deck[cache[d]][0]){
				in_cache = true;
				index = cache[d];
				cache.splice(d, 1);

				console.log('checkedCache', index)

				return index;
				
			}

		}
		console.log('checkedCache', num)
		return num;
	}

	is_player_term = false
	//pick two random cards
	first = randCard();
	

	card_in_computer_cache = checkCache(computer_cache, first)

	if(card_in_computer_cache===first){
		second = randCard();
		computer_cache.push(second);
	}else{
		second = card_in_computer_cache;
	}
	computer_cache.push(first);
	
	console.log('first and second: ', first, second, computer_cache)

	setTimeout(computerAlert(deck[first][0], deck[second][0]), 500);

	document.getElementById(first).style.background = 'rgb(79, 186, 61)';
	document.getElementById(first).innerHTML = deck[first];
	document.getElementById(second).style.background = 'rgb(79, 186, 61)';
	document.getElementById(second).innerHTML = deck[second];

	
	
	while(is_player_term === false){
		if(cards_flipped === deck.length){
					alert("Won, new game!");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
		if(deck[first][0] === deck[second][0]){
				computer_cache.remove(first);
				computer_cache.remove(second);

				card_ids.push(first);
				card_ids.push(second);

				document.getElementById(first).style.background = 'rgb(79, 186, 61)';
				document.getElementById(first).innerHTML = deck[first];
				document.getElementById(second).style.background = 'rgb(79, 186, 61)';
				document.getElementById(second).innerHTML = deck[second];


				first = randCard();
				
				
				card_in_computer_cache = checkCache(computer_cache, first)
	
				if(card_in_computer_cache===first){
					second = randCard();
					computer_cache.push(second);
				}else{
					second = card_in_computer_cache;
				}


				computer_cache.push(first);

				player_two += 1;
				cards_flipped += 2;
				score();
				setTimeout(computerAlert(deck[first][0], deck[second][0]), 500);
		}else{
			document.getElementById(first.toString()).style.background = 'rgb(36, 96, 147) no-repeat';
			document.getElementById(first.toString()).innerHTML = '';
			document.getElementById(second.toString()).style.background = 'rgb(36, 96, 147) no-repeat';
			document.getElementById(second.toString()).innerHTML = '';

			is_player_term = true;
		}
	}
}


// the on click function for one player
function checkFlippedCard(card,val){
	//set the cards to original state
	function flipBack(){
				    var One = document.getElementById(card_ids[card_ids.length-1]);
				    var Two = document.getElementById(card_ids[card_ids.length-2]);
				    One.style.background = 'rgb(36, 96, 147) no-repeat';
				    Two.style.background = 'rgb(36, 96, 147) no-repeat';
				    One.innerHTML = "";
            	    Two.innerHTML = "";
				    card_values = [];
            	    card_ids.pop();
            	    card_ids.pop();
        		}

    // conditionals to check if the two cards elected are equal
	if(card.innerHTML == "" && card_values.length < 2){
		card.style.background = 'rgb(79, 186, 61)';
		card.innerHTML = val;

		if(card_values.length < 1){
			card_values.push(val);
			card_ids.push(parseInt(card.id));

		} else if(card_values.length === 1){
			card_values.push(val);
			card_ids.push(parseInt(card.id));

			if(card_values[0].split(',')[0] === card_values[1].split(',')[0]){
				cards_flipped += 2;
				player_one += 1
				card_values = [];
				score();
				
				if(cards_flipped === deck.length){
					alert("Won, new game!");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				setTimeout(flipBack, 500);

				setTimeout(computerFlipCard, 500);
			}
		}
	}
}

// shuffle the deck
Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
   	// do a 3 way switch with a random number 52 times
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//create new game
function newBoard(){
	// create the deck, shuffle it, then add it as a div onto the DOM
	generate();
	score();
	cards_flipped = 0;
	var output = '';

	player_one = 0;
	player_two = 0;
	card_ids = [];
	cards_flipped = 0;
	computer_cache = [];
	
    deck.shuffle();
	for(var i = 0; i < deck.length; i++){
		output += '<div class="tiles" id='+i+' onclick="checkFlippedCard(this,\''+deck[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
