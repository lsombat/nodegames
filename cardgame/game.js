// http://www.tamas.io/online-card-game-with-node-js-and-socket-io-episode-1/

function getscores(hand) {
	
	var x=[];
	var suits = new Array("S", "B", "CU", "CO");
	
	for (i=0;i<suits.length;i++) {	
	s=inArray(suits[i],hand);
	if(s[0]>1) { return s[1]; } else if(s[0]==1) { x.push(s[1]); }
	}
	if(x.length==3) { x.sort(); return x[2]; }
	return false;

}

function inArray(needle, haystack) {
    var length = haystack.length;
    var pos;
    var r = [];
    var score =0;
    for(var i = 0; i < length; i++) {
    	pos = haystack[i].search(needle);
        if(pos>-1)
            r.push(parseInt(haystack[i].substring(0,pos)));
    }
    if(r.length==3) { r.sort(); score=r[2]; }
    else if(r.length==2) { r.sort(); if((r[0]+r[1]<=13) && (r[0]<=7 && r[1]<=7 ) ) score=r[0]+r[1]+20; else score=r[0]+r[1]+10; }
    else if(r.length==1) { score=r[0] } else { score=0 }
    var v=[r.length,score]; 
    //console.log(v);
    return v;
}

function createPack() {  
  var suits = new Array("S", "B", "CU", "CO");
  var pack = new Array();
  var n = 40;
  var index = n / suits.length;

  var count = 0;
  for(i = 0; i <= 3; i++)
      for(j = 1; j <= index; j++)
          pack[count++] = j + suits[i];

  return pack;
}

function shufflePack(pack) {  
  var i = pack.length, j, tempi, tempj;
  if (i === 0) return false;
  while (--i) {
     j = Math.floor(Math.random() * (i + 1));
     tempi = pack[i];
     tempj = pack[j];
     pack[i] = tempj;
     pack[j] = tempi;
   }
  return pack;
}

function draw(pack, amount, hand, initial) {  
  var cards = new Array();
  cards = pack.slice(0, amount);

  pack.splice(0, amount);

  if (!initial) {
    hand.push.apply(hand, cards);
    //hand.concat(hand);
  }

  return cards;
}

function playCard(amount, hand, index) {  
  hand.splice(index, amount)
  return hand;
}

exports.createPack = createPack;  
exports.shufflePack = shufflePack;  
exports.draw = draw;  
exports.playCard = playCard;
exports.getscores = getscores; 
