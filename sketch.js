var p1;
var p2;
var level = 1;
var checkpoints = [];
var o = [];
var y;
var seconds = 0
var minutes = 0
var hours = 0
var end;
var t = document.createElement("h5")
function keyPressed() {
  if (keyCode === UP_ARROW) {
    p1.dir(0, -5)
  }
  else if (keyCode === DOWN_ARROW) {
    p1.dir(0, 5)
  }
  else if (keyCode === RIGHT_ARROW) {
    p1.dir(5, 0)
  }
 else if (keyCode === LEFT_ARROW) {
    p1.dir(-5, 0)
  }
  else if (key === 'w') {
    p2.dir(0, -5)
  }
  else if (key === 's') {
    p2.dir(0, 5)
  }
  else if (key === 'd') {
    p2.dir(5, 0)
  }
  else if (key === 'a') {
    p2.dir(-5, 0)
  }
  else {
    p1.dir(0, 0)
    p2.dir(0, 0)
    }

}
function setup() {
    createCanvas(800, 500)
    p1 = new Player(50, 220);
    p2 = new Player(50, 240);
    end = new EndPoint(760, 250)
    y = new CircleBoi(200, 100)
     document.body.appendChild(t)
     
     
     for (var i = 0; i<4; i++) {
       o[i] = new object(350+i*100, random(50, 300));
     }
}
 var time = setInterval(10, goUp)
 
 function goUp() {
 seconds = seconds + 1
 
 }
function draw() {
var t2 = document.getElementById("t")
    background("#ffd395")
    if (seconds<45) {
    seconds = seconds + 1
    }
 else {
    minutes += 1
    seconds = 0
    
    if (minutes>59) {
      hours += 1;
      minutes = 0
   }
 }
    t.innerHTML = "Level: "+level;
   t2.innerHTML = hours + ":" + minutes+":"+seconds;
    p1.move(UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW)
    y.move()
    y.waitFor(p1, p2)
    y.display("#ffdd00");
    p2.move('w', 's', 'a', 'd')
    p1.display("#ff3f15")
    p2.display("#7fd6ff")
    end.waitFor(p1, p2)
    end.display("#40a2ff")
    var d1_ = dist(p1.x, p1.y, end.x, end.y)
    var d2_ = dist(p2.x, p2.y, end.x, end.y)
    
    if (d1_<p1.r+end.r && d2_ < p2.r+end.r) {
       level += 1;
       checkpoints.push(hours+":"+minutes+":"+seconds);
      seconds = 0
      o[0].x = random(200, 350);
      minutes = 0
      hours = 0
     p1.x = 50;
     p2.x = 50; 
      p1.y = 220
      p2.y = 240;
      p1.dir(0, 0)
      p2.dir(0, 0);
      
      if (level>10) {
        document.write("Level 1: "+checkpoints[0]+"<br>"+"Level 2: "+checkpoints[1]+"<br>"+"Level 3: "+checkpoints[2]+"<br>"+"Level 4: "+checkpoints[3]+"<br>"+"Level 5: "+checkpoints[4]+"<br>");
     }
   }
    
    for (var i=0; i<o.length; i++) {
    o[i].move()
    o[i].display(0+i*25)
    var c = dist(p1.x, p1.y, o[i].x, o[i].y)
    
    if (c<30) {
      p1.x = random(20, 500)
      p1.y = random(20, 300)
     }
      var c1 = dist(p2.x, p2.y, o[i].x, o[i].y)
    
    if (c1<30) {
      p2.x = random(20, 500)
      p2.y = random(20, 300)
    }
   }
}


class Player {
   constructor(x, y) {
     this.x = x
     this.y = y
     this.r = 10
     this.xspeed = 0
     this.yspeed = 0
     }
     move(k1, k2, k3, k4) {
     this.x = constrain(this.x, 0, 780)
      this.y = constrain(this.y, 0, 480)
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed
     }
     dir(l, h) {
       this.l = l
       this.h = h
       this.xspeed = this.l
       this.yspeed = this.h
     }
     display(col) {
     this.col = col
     fill(this.col)
     rect(this.x, this.y, this.r*2, this.r*2)
     }
   }
     
class object {
   constructor(x, y) {
     this.x = x
     this.y = y
     this.r = 20
     this.xspeed = 0
     this.yspeed = level
     this.ystop = random(300, 450)
     this.ystop2 = random(10, 50)
     }
     move() {
  
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
        
        if (this.y > this.ystop) {
        this.yspeed = -level
     }
        if (this.y < this.ystop2) {
        this.yspeed = +level
       }
          
    }
     display(col) {
     this.col = col
     fill(this.col)
     rect(this.x, this.y, this.r*2, this.r*2)
     }
   }
     
class EndPoint {
   constructor(x, y) {
     this.x = x
     this.y = y
     this.r = 40
     }
     
     waitFor(body, body2) {
      var d1 = dist(body.x, body.y, this.x, this.y)
      var d2 = dist(body2.x, body2.y, this.x, this.y)
      
      if (d1<25 && d2<25) {
      
  }
     }
     display(col) {
     this.col = col
     fill(this.col)
     ellipse(this.x, this.y, this.r*2, this.r*2)
     }
   }
     
class CircleBoi {
   constructor(x, y) {
     this.x = x
     this.y = y
     this.r = 45
     this.xspeed = 0;
       this.yspeed = level
     this.ystop = random(300, 450)
     this.ystop2 = random(10, 50)
     }
     move() {
     
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
        
        if (this.y > this.ystop) {
        this.yspeed = -level
     }
        if (this.y < this.ystop2) {
        this.yspeed = +level
       }
          
    }
     waitFor(body, body2) {
      var d1 = dist(body.x, body.y, this.x, this.y)
      var d2 = dist(body2.x, body2.y, this.x, this.y)
      if (d1<this.r+10) {
          body.x = 30;
      }
      if (d2<this.r+10) {
          body2.x = 30;
      }
     }
     display(col) {
     this.col = col
     fill(this.col)
     ellipse(this.x, this.y, this.r+level*5, this.r+level*5)
     }
   }
     
