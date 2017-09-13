var increaseDifficulty = true;
var increaseAfter = 300; //Frames

var bubbles = [];
var difficulty = 1;
var otherDiff = 1;
var score = 0;
var a = 0;
var baseDiff = difficulty;
var dead = false;

//For followers
var followers = [];

var radius = 20;
var delay = 100;


function setup() {
  createCanvas(800, 800);
  frameRate(60);
  resetSketch();

   X = width / 2;
   Y = width / 2;
   nX = X;
   nY = Y;  

}

function draw() {
  background(0);
  textSize(50);
  textStyle(BOLD);
  text('Score: ' + score, 10, 790);
  for (var i = 0; i < bubbles.length; i++) {
    var d = dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y);
      bubbles[i].move();
      bubbles[i].display();
    if (d < 20) {
      dead = true;
    }
  }
  
  for (var i = 0; i < followers.length; i++){
    var dd = dist(mouseX, mouseY, followers[i].X, followers[i].Y);
    followers[i].display();
    if (dd < 10) {
      dead = true;
    }
  }  
  a++;
  

  if (a > increaseAfter){
    a = 0;
    if (increaseDifficulty == true){
      difficulty += 2;
      otherDiff++;
      console.log('Level up!');
      resetSketch();
    }
  }
  if (score > 100){
    if (mouseX > width || mouseY > height || mouseX < 0 || mouseY <= 8){
  	  dead = true;
    }
  }
  if (dead == true){
    alert('You died with a score of ' + score + '. Please refresh!');
    score = 0;
  }

  if (mouseIsPressed){
    frameRate(20);
    score--;
    if (score < 0 ){
      score = 0;
    }
  }
  else{
    frameRate(60);
    score++;
  }
}

function randomizer(min, max) {
  return Math.random() * (max - min) + min;
}

function resetSketch() {
  for (var i = 0; i < difficulty; i++) {
    bubbles[i] = {
      xspeed: random(-10, 10),
      yspeed: random(-10, 10),
      x: width/2 - 20,
      y: height/2 - 20,
      display: function() {
        stroke(255);
        noFill();
        ellipse(this.x, this.y, 40, 40);
      },
      move: function() {
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
        
        if (this.x < 0 || this.y < 0 || this.x > width || this.y > height){

          this.x = width/2 - 20;
          this.y = height/2 - 20;
          this.xspeed = random(-10, 10);
          this.yspeed = random(-10, 10);
        }
      }
    }
  }

  for (var i = 0; i < otherDiff; i++) {
    followers[i] = {
      X: random(width),
      Y: random(height),
      radius: 20,
      display: function() {
      	this.X+=(mouseX-this.X)/delay;
        this.Y+=(mouseY-this.Y)/delay;
        stroke(255, 0, 0);
        noFill();
        ellipse(this.X, this.Y, this.radius, this.radius);
        stroke(255);
      }

    }
  }
}
