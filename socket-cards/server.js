// https://www.npmjs.com/package/socket.io
// http://www.tamas.io/online-card-game-with-node-js-and-socket-io-episode-2/
var io = require("socket.io")();
var game = require("./game");
var socket = io.listen(1222);  
//socket.set("log level", 1);

var players = {};  
var start = false;  
var pack = game.shufflePack(game.createPack());

Object.size = function(obj) {  
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

socket.on('connection', function (client) {  
  client.on('addPlayer', function(player){
    players[client.id] = player;
    console.log("Player " + player + "with id: " + client.id + "has connected.");
    console.log(Object.size(players));
    for(var key in players) {
      console.log("Players: " + key + ": " + players[key]);
    }
  });

  client.on('disconnect', function(){
    console.log("Player with id: " + client.id + "has disconnected");
    delete players[client.id];
    for(var key in players) {
      console.log("Remaining players: " + key + ": " + players[key]);
    }
    //reset pack
    pack = game.shufflePack(game.createPack());
  });

  client.on('dealCards', function(){
    var cards = game.draw(pack, 5, "", true);
    client.emit('showCards', cards);
    socket.sockets.emit("remainingCards", pack.length)
  });
});
