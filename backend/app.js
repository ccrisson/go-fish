const express = require('express');
const bodyParser= require('body-parser');
const router = express.Router();

const deckService = require('./controllers/deck.js');

const app = express();

// app.use('', (req, res, next) => {
//   let newDeck = deckService.createDeck();
//   let htmlDeck = '';
//   for (let i = 0; i < newDeck.length; i++){
//     htmlDeck += `<div>${newDeck[i].rank} ${newDeck[i].suit}</div>`;
//   }
//   res.send(htmlDeck);
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/drawcard/:player', (req, res) => {
  deckService.drawCard(req.body, req.params.player);
  res.json(req.body);
});

app.post('/requestcard/:rank/player/:player', (req, res) => {
  console.log("requestcard");
  if (deckService.requestCard(req.body, req.params.rank, req.params.player)) {
    res.json(deckService.moveCards(req.body, req.params.rank, req.params.player));
  } else {
    res.json({"status": "go fish"});
  }
  
});

app.use('/newgame', (req, res, next) => {
  res.json(deckService.dealCards(deckService.createDeck()));
});

// app.use('/drawcard/:player', (req, res, next) => {
//   res.send(deckService.drawcard())
// })

module.exports = app;