const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var background;
var gameOver;
var restart;
var rocketImg;
var starImg ;
var alienImg;

var mute;

var canW;
var canH;


var shootButton;

var die_sound;
var bk_song;

function preload()
{
  backGround = loadImage("space.jpg");
  gameOver = loadImage("gameover.png");
  restart = loadImage("restart.png");

  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png");
  alienImg = loadImage("alien.png");

  die_sound = loadSound("die.mp3");
  bk_song = loadSound("sound1.mp3");

  
}


function setup() {
  engine = Engine.create();
  world = engine.world;

  var isMobile = /iPhone | iPad | iPod | Andriod /i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW + 80 , canH);
  } else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW , canH);
  }

  bk_song.play();
  bk_song.setVolume(2);
  //used background music from in class project because I didn't know how to upload music files

  shootButton = createImg('shootButton.png');
  shootButton.position(20,30);
  shootButton.size(50,50);
  shootButton.mouseClicked(shoot);

  mute_btn = createImg('mute.png');
  mute_btn.position(1350,780);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(200,canH,600,20);
  
  rocket = createSprite( 675,780);
  rocket.addImage(rocketImg);
  rocket.scale = 0.2;
  
  
  GameOver = createSprite(675,390);
  GameOver.addImage(gameOver);
  GameOver.scale = 0.8;
  GameOver.visible = false;


  star = createSprite(675,720);
  star.addImage(starImg);
  star.scale = 0.2;

  alien = createSprite(random(100,1100), 0);
  alien.addImage(alienImg);
  alien.velocityY = 2;
  alien.scale = 0.2;

  


  rectMode(CENTER);
  textSize(50)

  
  
}


function draw() 
{
  background(backGround);
  Engine.update(engine);



  push();
  imageMode(CENTER);

  ground.show();

  if(collide(alien,star)==true)
  {
    dieSound.play();
  }

  
  drawSprites();

  if(keyIsDown(LEFT_ARROW)){
  rocket.velocityX = -3;
  }

  if(keyIsDown(RIGHT_ARROW)){
    rocket.velocityX = 3;

  
  }

  star.x = rocket.x;
  

  

  if(alien.y > 780){
   GameOver.visible = true;
  }


}





function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function shoot(){
 star.velocityY = -3;
  

}

function collide(sprite1, sprite2){
  if(sprite2.isTouching(sprite1)){
    sprite1.destroy();
    die_sound.play();
    sprite2.x = 675
    sprite2.y = 750
  }

 
}





