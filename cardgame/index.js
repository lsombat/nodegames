//http://www.pagat.com/put/truco_ar.html : Envido, no flor
var sca=0;
var scb=0;
var round =1;
var envido =27;
var winnerscore=30;
var game = require("./game");

var pack = game.createPack();  
var myPack = game.shufflePack(pack);  
console.log("Size of pack before draw: " + myPack.length);  

var astart = true;

do {
console.log();
console.log("Round #"+round);

var handA = game.draw(myPack, 3, '', true); 
var scorea = game.getscores(handA); 
console.log("Size of pack after draw: " + myPack.length);  
console.log("Player A : "+handA+" scores="+scorea);  
//console.log(handA);  
//console.log();  

var handB = game.draw(myPack, 3, '', true);  
var scoreb = game.getscores(handB);
console.log("Size of pack after draw: " + myPack.length);  
console.log("Player B : "+handB + " scores="+scoreb);  
//console.log(handB);  
//console.log();

if (astart)  { 
console.log("A: Start"); 
if (scorea>=envido) { 
console.log("A: Calls Envido"); 
if (scoreb>=envido) { 
	console.log("B: I want");
	if(scorea>0 && scoreb>0) {
		if(scorea>scoreb) { diff=scorea-scoreb;sca+= diff; console.log("A win : got "+ diff);
		} else if(scoreb>scorea) { diff=scoreb-scorea;scb += diff; console.log("B win : got "+diff); }
		} else if(scorea==scoreb) { sca+=2; console.log("A win : got 2");}
} else {
	console.log("B: I don't want");
	sca++;
	console.log("A win : got 1");
}
} else { console.log("A: Pass"); 
if (scoreb>=envido) { 
console.log("B: Calls Envido"); 
console.log("A: I don't want");
scb++;
console.log("B win : got 1");
} else { console.log("B: Pass"); }
}
astart=false;
} else { 
console.log("B: Start"); 
if (scoreb>=envido) { 
console.log("B: Calls Envido"); 
if (scorea>=envido) { 
	console.log("A: I want");
	if(scorea>0 && scoreb>0) {
		if(scorea>scoreb) { diff= scorea-scoreb; sca+=diff; console.log("A win got "+diff); 
		} else if(scoreb>scorea) { diff= scoreb-scorea;scb +=diff; console.log("B win : got "+diff);}
		} else if(scorea==scoreb) { scb+=2; console.log("B win : got 2"); }
} else {
	console.log("A: I don't want");
	scb++;
	console.log("B win : got 1");
}
} else { console.log("B: Pass");
if (scorea>=envido) { 
console.log("A: Calls Envido"); 
console.log("B: I don't want");
sca++;
console.log("A win : got 1");
} else { console.log("A: Pass"); }

}
astart=true;
}

if(myPack.length<=4) { pack = game.createPack(); myPack = game.shufflePack(pack); }

console.log("Global Scores: A="+sca + ', B=' + scb);
round++;

} while (sca<winnerscore && scb<winnerscore);

//var lastCard = handA.length-1;  
//console.log("Last card's index: " + lastCard);  
//var newHand = game.playCard(1, handA, lastCard);  
//console.log("Cards in my new hand are:");  
//console.log(newHand);  
//console.log();  