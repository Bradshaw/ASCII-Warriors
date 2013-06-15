var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var scroll = 0;
var raise = height;
var spart = [];
function clock(){
	return (new Date()).getMilliseconds();
}

function tick(){

    var now = Date.now();
    var dt = Math.max(now - lastUpdate,1000/20);
    lastUpdate = now;

	ascwar.setColour(10,20,30);
	ascwar.setNeutral(".")
	ascwar.clearScreen();
	scroll+=0.01*dt;
	ascwar.setColour(25,35,45);
	var ligt= false;
	if (Math.random()>0.95){
		ligt = true;
		ascwar.setColour(64,64,64);
	}
	ascwar.circle(width/2,height/2,35+Math.sin(scroll/7)*5,"-");
	ascwar.circle(width/2,height/2,25+Math.sin(scroll/7)*5,"=");
	ascwar.circle(width/2,height/2,15+Math.sin(scroll/7)*5,"#");
	if (!ligt){
		ascwar.setColour(100,40,25);
		ascwar.circle(width/3,height/3,12+Math.sin(scroll/10)*2+2.6,"-");
		ascwar.circle(width/3,height/3,12+Math.sin(scroll/10)*2,"=");
		ascwar.circle(width/3,height/3,12+Math.sin(scroll/10)*2-4,"#");
	}
	
	if (ligt){
		ascwar.setColour(255,160,100);
	} else {
		ascwar.setColour(220,60,30);
	}

	raise = Math.max(1,raise-0.004*dt)
	ascwar.text(width/2-29,raise+6,"############_____####__________________#.___.___","#");
	ascwar.text(width/2-29,raise+7,"###########/  _  \\  /   _____/\\_   ___ \\|   |   |","#");
	ascwar.text(width/2-29,raise+8,"##########/  /_\\  \\ \\_____  \\ /    \\  \\/|   |   |","#");
	ascwar.text(width/2-29,raise+9,"#########/    |    \\/        \\\\     \\___|   |   |","#");
	ascwar.text(width/2-29,raise+10,"#########\\____|__  /_______  / \\______  /___|___|","#");
	ascwar.text(width/2-29,raise+11,"##__######__#####\\/########\\/#####__##\\/","#");
	ascwar.text(width/2-29,raise+12,"#/  \\    /  \\_____ ______________|__| ___________  ______","#");
	ascwar.text(width/2-29,raise+13,"#\\   \\/\\/   /\\__  \\\\_  __ \\_  __ \\  |/  _ \\_  __ \\/  ___/","#");
	ascwar.text(width/2-29,raise+14,"##\\        /  / __ \\|  | \\/|  | \\/  (  <_> )  | \\/\\___ \\","#");
	ascwar.text(width/2-29,raise+15,"###\\__/\\  /  (____  /__|   |__|  |__|\\____/|__|  /____  >","#");
	ascwar.text(width/2-29,raise+16,"########\\/########\\/##################################\\/","#");

	ascwar.setColour(100,127,127);
	var i = 0;
	while (i<spart.length) {
    	spart[i].y += (spart[i].spd/50)*dt;
    	spart[i].x += Math.random();
    	if (spart[i].y>height){
    		spart.splice(i,1);
    	} else {
    		ascwar.setXY(spart[i].x,spart[i].y,"'");
    		i++;
    	}
    }
    if (spart.length<150){
    	spart.push({x:Math.random()*width*2-width, y:0, spd:1+Math.random()});
    }

    ascwar.setColour(200,80,50);
	//box((width/3)-1-(15/2),height/3-2,15+2,3,"+",'-','|');
	ascwar.setColour(255,255,100);
	//text((width/3)-(15/2),height/3-1,"ASCII Warriors!");


	if (ligt){
    	ascwar.setColour(70,80,70);
    } else {
    	ascwar.setColour(15,40,10);
    }
    ascwar.circle(2*width/3,height*3.3,height*4,"#");

    if (ligt){
		ascwar.setColour(255,160,100);
	} else {
		ascwar.setColour(200,80,50);
	}
    

	ascwar.setColour(100,40,40);
	ascwar.box(0,0,width,height,"+",'-','|');
	ascwar.text(3,0,"+ ASCII Warriors +")
	ascwar.text(width/2-29,height-1,"#######+ Kevin \"Gaeel\" Bradshaw - 2013 - YoinkPL +",'#')
	ascwar.paint();
}

console.log("loaded");