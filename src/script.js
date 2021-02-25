// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canv = document.getElementById('myCanvas'),
    ctx = canv.getContext('2d');
var ship;
ship=new Ship();
var drops=[];

var flowers=[];
for(var i=0;i<15;i++){
	flowers[i]=new Flower(i*80+80,60,30);
}


function draw() {
	ctx.clearRect(0, 0, canv.width, canv.height);
		ship.show();
		ship.move();
		for(var i=0;i<drops.length;i++){
			drops[i].show();
			drops[i].move();
			
			for(var j=0;j<flowers.length;j++){
			if(drops[i].hits(flowers[j])){
				console.log("remove");
				flowers.splice(j,1);
				
			}
			}
		}
		var edge=false;
		for(var k=0;k<flowers.length;k++){
			flowers[k].show();
      flowers[k].move();
      if(flowers[k].x>canv.width || flowers[k].x<0){
          for(var l=0;l<flowers.length;l++){
            flowers[l].moveDown();
          }
      } 
		}
        requestAnimationFrame(draw);
        // Drawing code goes here
    
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
	if (e.keyCode == '32') {
        // up arrow
		//ship.up();
		var drop=new Drop(ship.x+30,canv.height-177);
		drops.push(drop);
		console.log('space')
    }
   /* if (e.keyCode == '38') {
        // up arrow
		//ship.up();
		console.log('up')
    }
	*/
    else if (e.keyCode == '40') {
        // down arrow
		//ship.up();
		console.log('down')
    }
    else if (e.keyCode == '37') {
       // left arrow
	   ship.setDir(-1);
	   console.log('left')
    }
    else if (e.keyCode == '39') {
       // right arrow
	  ship.setDir(1);
	  console.log('right')
    }

}


draw();


function Drop(x,y){
	this.x=x;
	this.y=y;
	this.show=function(){
		ctx.fillStyle = "#c82124"; //red
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, 10, 10, 45 * Math.PI/180, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
	this.move=function(dir){
		this.y -=3;
	}
	this.hits=function(flower){
		if (this.x < flower.x + 60 &&	   this.x + 10 > flower.x &&
			   this.y < flower.y + 60 &&
			   10 + this.y > flower.y) {
    // collision detected!
	console.log("detected")
			return true;
		}
		else{
			return false;
		}
		
	}
	
}


function Flower(x,y,w){
	this.x=x;
	this.y=y;
	this.w=w;
  this.xdir=1;
  this.ydir=0;
	this.show=function(){
		//ctx.fillStyle = "#c82124"; //red
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.w, this.w, 45 * Math.PI/180, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
	this.move=function(dir){
		this.x +=this.xdir;
    this.y +=this.ydir;
	}
  this.moveDown=function(){
    this.xdir*=-1;
    this.y+=67;
  }
	
}

function Ship(){
	this.x=canv.width/2;
  this.xdir=0;
	this.show=function(){
		
		  ctx.beginPath();
		  ctx.rect(this.x, canv.height-177, 60, 180);
		  ctx.fillStyle = 'yellow';
		  ctx.fill();
		  ctx.lineWidth = 7;
		  ctx.strokeStyle = 'black';
		  ctx.stroke();
	}
  this.setDir=function(dir){
		this.xdir =dir;
	}
	this.move=function(dir){
		this.x +=this.xdir*5;
	}
	
}

