var scroll = 0;
var raise = height;
var spart = [];
var fps = 0;

ascwar.update = function(dt){
	fps = (1000/dt)
    dt = Math.min(dt,1000/20);

	scroll+=0.01*dt;
	raise = Math.max(1,raise-0.004*dt)
	
	var i = 0;
	var dir = Math.sin(scroll/128)
	while (i<spart.length) {
    	spart[i].y += (1/40)*dt;
    	spart[i].x += (spart[i].spd/40)*dt*dir*1.3;
    	if (spart[i].y>height){
    		spart.splice(i,1);
    	} else {
    		i++;
    	}
    }
    if (spart.length<50){
    	spart.push({x:Math.floor(Math.random()*width*3-width), y:0, spd:1+Math.random()});
    	spart.push({x:Math.floor(Math.random()*width*3-width), y:0, spd:1+Math.random()});
    }
}

ascwar.draw = function(dt){

	//ascwar.setColour(10,20,30);
	ascwar.setColour(25,35,45);
	ascwar.setNeutral(" ")
	ascwar.clearScreen();
	ascwar.setColour(25,35,45);
	var ligt= false;
	if (Math.random()>0.95){
		ligt = true;
		ascwar.setColour(64,64,64);
	}
	ascwar.circle(width/2,height/2,45+Math.sin(scroll/7)*5,"-");
	ascwar.circle(width/2,height/2,35+Math.sin(scroll/7)*5,"=");
	ascwar.circle(width/2,height/2,25+Math.sin(scroll/7)*5,"#");
	if (!ligt){
		ascwar.setColour(100,40,25);
		ascwar.circle(width/3,height/3,15+Math.sin(scroll/10)*2+2.6,"-");
		ascwar.circle(width/3,height/3,15+Math.sin(scroll/10)*2,"=");
		ascwar.circle(width/3,height/3,15+Math.sin(scroll/10)*2-4,"#");
	}
	
	if (ligt){
		ascwar.setColour(255,160,100);
	} else {
		ascwar.setColour(220,60,30);
	}
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
	if (raise==1 && Math.floor(scroll/8)%2==1){
		ascwar.setColour(220,60,30);
		ascwar.text(width/2-5,18,"INSERT COIN"," ");
	}
	if (ligt){
    	ascwar.setColour(70,80,70);
    } else {
    	ascwar.setColour(25,40,10);
    }
    ascwar.circle(2*width/3,height*3.6+1,height*4.5,"#");
    ascwar.circle(width/4,height*3.65+1,height*4.5,"#");

	ascwar.setColour(100,127,127);
	var i = 0;
	var dir = Math.sin(scroll/128)
	while (i<spart.length) {
		if (dir<-0.2) {
			ascwar.setXY(spart[i].x,spart[i].y,"/");
		} else if (dir>0.2) {
			ascwar.setXY(spart[i].x,spart[i].y,"\\");
		} else {
			ascwar.setXY(spart[i].x,spart[i].y,"|");
		} 
		i++;
    }
    

	ascwar.setColour(100,40,40);
	ascwar.box(0,0,width,height,"+",'-','|');
	ascwar.text(3,0,"+ ASCII Warriors v0.0 +")
	//ascwar.text(1,height-2,"F/s:"+Math.round(fps));
	ascwar.text(width/2-29,height-1,"#######+ Kevin \"Gaeel\" Bradshaw - 2013 - YoinkPL +",'#')
}

console.log("loaded");