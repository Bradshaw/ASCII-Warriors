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
		setXY(i+x,y,text[i]);
	}
}

function clock(){
	return (new Date()).getMilliseconds();
}

function circle(x,y,r,chr){
	var r2 = r*r
	for (var i=-r;(i<=r && i<width);i++){
		for (var j=-r*ratio;(j<=r*ratio && j<height);j++){
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

var spart = [];

function tick(){

    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;

	setColour(10,20,30);
	setNeutral(".")
	clearScreen();
	scroll+=0.01*dt;
	setColour(25,35,45);
	circle(width/2,height/2,35+Math.sin(scroll/7)*5,"-");
	circle(width/2,height/2,25+Math.sin(scroll/7)*5,"=");
	circle(width/2,height/2,15+Math.sin(scroll/7)*5,"#");
	setColour(100,40,25);
	circle(width/3,height/3,8+Math.sin(scroll/10)*2+2.6,"-");
	circle(width/3,height/3,8+Math.sin(scroll/10)*2+1.3,"=");
	circle(width/3,height/3,8+Math.sin(scroll/10)*2,"#");
	setColour(200,80,50);
	box((width/3)-1-(15/2),height/3-2,15+2,3,"+",'-','|');
	setColour(255,255,100);
	text((width/3)-(15/2),height/3-1,"ASCII Warriors!");

	setColour(100,127,127);
	var i = 0;
	while (i<spart.length) {
    	spart[i].y += (spart[i].spd/50)*dt;
    	spart[i].x += Math.random();
    	if (spart[i].y>height){
    		spart.splice(i,1);
    	} else {
    		setXY(spart[i].x,spart[i].y,"'");
    		i++;
    	}
    }
    if (spart.length<50){
    	spart.push({x:Math.random()*width*2-width, y:0, spd:1+Math.random()});
    }

    setColour(15,60,10);
    circle(width,height*2.5,height*3,"#");

	setColour(100,40,40);
	box(0,0,width,height,"+",'-','|');
	box(0,0,8,3,"+",'-','|');
	text(1,1,"f/s:"+Math.round(1000/dt));
	paint();
}

console.log("loaded");