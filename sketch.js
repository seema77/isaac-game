var person,player
var obstaclesGroup,o1,o2
var PLAY = 1
var END = 0
var gameState = PLAY;
var gameOverImg,restartImg
var score = 0;
var coinsGroup;

function preload(){

  backgroundSound = loadSound("background.mp3");
  bounceSound = loadSound("bounce.mp3");
  LoserSound = loadSound("Loser.mp3");


 bgimg = loadImage("bg2.jpg");
 person = loadAnimation("player 1.png","player3.png","player2.png");
 o1 = loadImage("o1.png")
 o2 = loadImage("o2.png")
 
 restartImg = loadImage("restartbutton.png");
 gameOverImg = loadImage("gameOver.png");
 collided = loadImage("player2.png");
 coinImg = loadImage("coin.png");
  
}

function setup() {
    createCanvas(1200,560)
    bg = createSprite(600,200,1200,400);
    bg.addImage(bgimg)
    bg.x = bg.width/2
    
    bg.scale = 1.6;

  player = createSprite(50,350,20,20);
  player.addAnimation("player",person);
  player.addAnimation("collided",collided);
  player.scale = 0.5;

  
  mute_btn = createImg('mute.png');
  mute_btn.position(1100,20);
  mute_btn.size(70,70);
 mute_btn.mouseClicked(mute);

 invisibleGround = createSprite(600,530,1200,10);
 player.debug = false
 player.setCollider("rectangle",0,0,100,150);

  obstaclesGroup = new Group();
  coinsGroup = new Group();
  
gameOver = createSprite(width/2,height/2- 100);
   gameOver.addImage(gameOverImg);
     restart = createSprite(width/2,height/2);
   restart.addImage(restartImg);
  
   gameOver.scale = 0.5;
   restart.scale = 0.3;

   score = 0
 
  
}

function draw() {
  //set background color
    background(bgimg);
  background("black")
  

  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;

    backgroundSound.play();
    backgroundSound.setVolume(0.01);

    bg.velocityX = -3;
    if(bg.x<0){
      bg.x = bg.width/2
    }

        if( keyDown("space")&& player.y >=470){
        
      player.velocityY = -13
      bounceSound.play();
     }

     if(keyDown("up_arrow")&& player.y>=470){
      player.velocityY = -20
      bounceSound.play();
     }
     if(coinsGroup.isTouching(player)){
      score = score+5;
      coinsGroup.destroyEach();
     
      gamestate = END;
     }
     player.velocityY = player.velocityY+0.5;
     spawnObstacles();
     spawnCoins();
     if(obstaclesGroup.isTouching(player)){
      
       LoserSound.play();
      gameState = END
      
       }     
     }


  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    player.velocityY = 0.5;

  

  bg.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  coinsGroup.destroyEach();
  player.changeAnimation("collided",collided);

  if( mousePressedOver(restart)) {      
    reset();
    
  }
 }

     player.collide(invisibleGround);
   
   drawSprites();

   textSize(30);
   fill("red");
  text("Score: "+ score,30,50);

  }  
    function spawnObstacles(){
   if(frameCount % 100 === 0){
    var obstacle = createSprite(1050,490,10,40);
         obstacle.velocityX = -6;
         obstacle.scale = 0.15
     // generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(o1);
               break;
       case 2: obstacle.addImage(o2);
               break;

   }
   obstaclesGroup.add(obstacle);
     }
    }
  
    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;      
      obstaclesGroup.destroyEach();
      player.changeAnimation("player",person)      
      score = 0;
      
    }

    function spawnCoins(){

    if(frameCount%80 === 0 ){
      coin = createSprite(900,random(150,350),20,20)
      coin.velocityX = -5
       coin.addImage(coinImg);
       coin.scale = 0.083;
       coinsGroup.add(coin);
    }
    }
    function mute()
    {
      if(backgroundSound.isPlaying())
         {
          backgroundSound.stop();
         }
        
    }

  
