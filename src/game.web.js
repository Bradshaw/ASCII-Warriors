var screen = document.getElementById("displaybox");
var screenBuffer = [];
var width = 80;
var height = 30;
var red = 25;
var green = 25;
var blue = 25;
var neut = ".";
var ratio = 1.6

screen.innerHTML = "Loading...";

function paint(){
	var buf = ""
	var lr = -1;
	var lg = -1;
	var lb = -1;
	var fonted = false
	for (var j=0;j<height;j++){
		for (var i=0;i<width;i++){
			var c = getXY(i,j)
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
			buf += getXY(i,j).chr;
		}
		buf +="<br />";
	}
	if (fonted){
		buf += "</font>";
	}
	screen.innerHTML = buf;
}

function getXY(x,y){
	y=Math.floor(y);
	x=Math.floor(x);
	var pos = ((y%height)*width+(x%width));
	return screenBuffer[pos];
}

function setXY(x,y,chr){
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
			}
		} else {
			screenBuffer[pos].chr = chr;
			screenBuffer[pos].r = red;
			screenBuffer[pos].g = green;
			screenBuffer[pos].b = blue;
		}
	}
}

function clearScreen(chr){
	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){
			setXY(i,j,neut);
		}
	}
}

function rectangle(x,y,w,h,chr){
	for (var i=x;i<x+w;i++){
		for (var j=y;j<y+h;j++){
			setXY(i,j,chr);
		}
	}
}

function box(x,y,w,h,corn,hori,vert) {
	for (var i=x;i<x+w;i++){
		setXY(i,y,hori);
		setXY(i,y+h-1,hori);
	}
	for (var i=y;i<y+h;i++){
		setXY(x,i,vert);
		setXY(x+w-1,i,vert);
	}
	setXY(x,y,corn);
	setXY(x+w-1,y,corn);
	setXY(x+w-1,y+h-1,corn);
	setXY(x,y+h-1,corn);
}

function text(x,y,text){
	for (var i=0; i<text.length; i++){
		if (text[i]!=' '){
			setXY(i+x,y,text[i]);
		} else {
			setXY(i+x,y,"&nbsp");
		}
	}
}

function clock(){
	return (new Date()).getMilliseconds();
}

function circle(x,y,r,chr){
	var r2 = r*r
	for (var i=-r;i<=r;i++){
		for (var j=-r*ratio;j<=r*ratio;j++){
			var dx = i+0.5;
			var dy = j*ratio+0.5;
			var d2 = (dx*dx+dy*dy);
			if (d2<r2) {
				setXY(i+x,j+y,chr);
			}
		}
	}
}

function setColour(r,g,b){
	red = r;
	green = g;
	blue = b;
}
function setNeutral(chr){
	neut = chr;
}



var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var scroll = 0;
function tick(){

    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;

	setColour(25,25,25)
	setNeutral(".")
	clearScreen();
	scroll+=0.02*dt;
	setColour(25,35,45)
	circle(width/2,height/2,35+Math.sin(scroll/7)*5,"-");
	circle(width/2,height/2,25+Math.sin(scroll/7)*5,"*");
	circle(width/2,height/2,15+Math.sin(scroll/7)*5,"#");
	setColour(25,80,100)
	circle(width/2+Math.sin(scroll/34)*(width/3),height/2+Math.cos(scroll/34)*(height/3)*ratio,5+Math.sin(scroll/3)*3,"#");
	setColour(100,100,100)

	box((width/2)-1-(13/2),2*height/3-Math.abs(Math.sin(scroll/5)*height/3)-1,13+2,3,"+",'-','|');
	setColour(25,120,60)
	text((width/2)-(13/2),2*height/3-Math.abs(Math.sin(scroll/5)*height/3),"Hello, world!");
	setColour(100,40,40)
	box(0,0,width,height,"+",'-','|');
	box(0,0,8,3,"+",'-','|');
	text(1,1,"f/s:"+Math.round(1000/dt))
	paint();
}

console.log("loaded");