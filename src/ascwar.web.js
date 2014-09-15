var ascwar = {};
ascwar.conf = {};

var screenBuffer = [];
var width = 120;
var height = 25;
var red = 25;
var green = 25;
var blue = 25;
var neut = ".";
var ratio = 1.6;

document.getElementById("displaybox").innerHTML = "Loading...";

ascwar.paint = function(){
	var buf = "";
	var lr = -1;
	var lg = -1;
	var lb = -1;
	var fonted = false
	for (var j=0;j<height;j++){
		for (var i=0;i<width;i++){
			var c = ascwar.getXY(i,j)
			if (c.r!=lr || c.g!=lg || c.b!=lb){
				if (fonted){
					buf += "</font>";
				}
				var sr = ("00"+(c.r.toString(16))).slice(-2);
				var sg = ("00"+(c.g.toString(16))).slice(-2);
				var sb = ("00"+(c.b.toString(16))).slice(-2);
				var col = ""+sr+sg+sb;
				buf += "<font style='color:#"+col+";'>";
				lr = c.r;
				lg = c.g;
				lb = c.b;
				fonted = true;
			}
			buf += c.chr;
		}
		buf +="<br />";
	}
	if (fonted){
		buf += "</font>";
	}
	document.getElementById("displaybox").innerHTML = buf;
};

ascwar.getXY = function(x,y){
	y=Math.floor(y);
	x=Math.floor(x);
	var pos = ((y%height)*width+(x%width));
	return screenBuffer[pos];
};

ascwar.setXY = function(x,y,chr){
	y=Math.floor(y);
	x=Math.floor(x);
	if (x>=0 && x<width && y>=0 && y<height) {
		var pos = (y*width+x);
		if (!screenBuffer[pos]) {
			screenBuffer[pos]={
				r: red,
				g: green,
				b: blue,
				chr: chr
			};
		} else {
			screenBuffer[pos].chr = chr;
			screenBuffer[pos].r = red;
			screenBuffer[pos].g = green;
			screenBuffer[pos].b = blue;
		}
	}
};

ascwar.clearScreen = function(chr){
	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){
			ascwar.setXY(i,j,neut);
		}
	}
};

ascwar.rectangle = function(x,y,w,h,chr){
	for (var i=x;i<x+w;i++){
		for (var j=y;j<y+h;j++){
			ascwar.setXY(i,j,chr);
		}
	}
};

ascwar.box = function(x,y,w,h,corn,hori,vert) {
	for (var i=x;i<x+w;i++){
		ascwar.setXY(i,y,hori);
		ascwar.setXY(i,y+h-1,hori);
	}
	for (var i=y;i<y+h;i++){
		ascwar.setXY(x,i,vert);
		ascwar.setXY(x+w-1,i,vert);
	}
	ascwar.setXY(x,y,corn);
	ascwar.setXY(x+w-1,y,corn);
	ascwar.setXY(x+w-1,y+h-1,corn);
	ascwar.setXY(x,y+h-1,corn);
}

ascwar.text = function(x,y,text,cover){
	for (var i=0; i<text.length; i++){
		if (text[i]!=cover)
		ascwar.setXY(i+x,y,text[i]);
	}
};

ascwar.circle = function(x,y,r,chr){
	var r2 = r*r;
	for (var i=-r;(i<=r && i<width);i++){
		for (var j=-r*ratio;(j<=r*ratio && j<height);j++){
			var dx = i+0.5;
			var dy = j*ratio+0.5;
			var d2 = (dx*dx+dy*dy);
			if (d2<r2) {
				ascwar.setXY(i+x,j+y,chr);
			}
		}
	}
};

ascwar.setColour = function(r,g,b){
	red = r;
	green = g;
	blue = b;
};
ascwar.setNeutral = function(chr){
	neut = chr;
};

ascwar.update = function(dt){};
ascwar.draw = function(){};
ascwar.tick = function(){
	var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
    ascwar.update(dt);
    ascwar.draw();
    ascwar.paint();
};

var lastUpdate = Date.now();
var myInterval = setInterval(ascwar.tick, (1000/60));