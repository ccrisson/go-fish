
function createDeck(){
  const suits = ['D', 'H', 'C', 'S'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

  let deck = [];
  for (let i = 0; i < suits.length; i++){
    for (let j = 0; j < ranks.length; j++){
      let card = {
        rank: ranks[j],
        suit: suits[i]
      }
      deck.push(card);
    }
  }
  deck = shuffleDeck(deck);
  return deck;
}

function shuffleDeck(deck){
  for (let cardSwaps = 0; cardSwaps < 10000; cardSwaps++){
    let index1 = Math.floor(Math.random() * deck.length);
    let index2 = Math.floor(Math.random() * deck.length);

    let temp = deck[index1];
    deck[index1] = deck[index2];
    deck[index2] = temp;
  }
  return deck;
}

function dealCards(deck){
  const handSize = 7;
  let player1 = {
    hand: [],
    matches: []
  };
  let player2 = {
    hand: [],
    matches: []
  };
  for (let i = 0; i < handSize; i++){
    player1.hand.push(deck.pop());
    player2.hand.push(deck.pop());
  }
  return {
    player1: player1,
    player2: player2,
    deck: deck
  };
}

function drawCard(gamestate, player){
  if (gamestate && player && gamestate.deck.length > 0){
    if (player == 'player1'){
      gamestate.player1.hand.push(gamestate.deck.pop());
    } else if (player == 'player2'){
      gamestate.player2.hand.push(gamestate.deck.pop());
    }
    return gamestate;
  }
  return gamestate;
}

function requestCard(gamestate, target, player){
  gamestate = makeSet(gamestate, 'player1');
  gamestate = makeSet(gamestate, 'player2');
  return gamestate["player1"].hand.find(card => card.rank == target);
}

function moveCards(gamestate, target, player){
  //return gamestate[player].hand.find(card => card.rank == target);
  const otherPlayer = player == 'player1' ? 'player2' : 'player1';
  for (let i = 0; i < gamestate[player].hand.length; i++) {
    if (gamestate[player].hand[i].rank == target){
      gamestate[otherPlayer].hand.push(gamestate[player].hand[i]);
      gamestate[player].hand.splice(i,i);
      i--;
    }
  }
  return gamestate;
}

function makeSet(gamestate, player){
  gamestate[player].hand.sort(function(a, b) {
    return a.rank - b.rank;
  });
  return gamestate;
  // for (let i = 0; i < gamestate[player].hand.length; i++){
  // }

}

exports.createDeck = createDeck;
exports.dealCards = dealCards;
exports.drawCard = drawCard;
exports.requestCard = requestCard;
exports.moveCards = moveCards;
