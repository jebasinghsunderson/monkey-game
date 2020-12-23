
var monkey , monkey_running,monkey_standing,monkey_standingimage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var survivalscore = 0;
var ground;
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(600,450);
  
    ground = createSprite (10,400,900,10);
    ground.x=ground.width/2
  
    monkey = createSprite(50,400,10,10);
    monkey.addAnimation("monkey",monkey_running);
    monkey.scale=0.1;
    monkey.collide(ground);
    monkey.debug=false;
    
    obstacleGroup = new Group();
    FoodGroup = new Group();
}


function draw() {
  
  background("white");
  
  textSize(20);
  text("survival time:"+survivalscore,400,20);
  textSize(20);
  text("score:"+score,400,40);
    if (gameState===PLAY){
        if(keyDown("space") && monkey.y===364.3){
          monkey.velocityY=-20;
         }
         monkey.velocityY=monkey.velocityY + 0.8;
       if(monkey.isTouching(FoodGroup)){
         
       score = score+1;
       FoodGroup.destroyEach();
   }
       survivalscore = survivalscore +  Math.round(getFrameRate()/60)
      
      if(monkey.isTouching(obstacleGroup)){
        obstacleGroup.setVelocityXEach(0,0);
        FoodGroup.setVelocityXEach(0,0);
        gameState=END;
       
      }
    if(frameCount % 200 === 0){
       spawnfruit();
    }
    if(frameCount % 150 === 0){
    spawnobstacle();
  }
    }
  if(gameState===END){
     FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY=0
    textSize(20)
    text("GAME OVER!!",220,100)
  }
  
 
  
    monkey.collide(ground);

    
  drawSprites();
}

function spawnfruit(){
  
   banana = createSprite(600,Math.round(random(150,300)),10,10);
   banana.addImage("banana",bananaImage);
   banana.scale=0.1;
   banana.velocityX=-(4 +2* score/100);
   banana.lifetime=150
   FoodGroup.add(banana);
}

function spawnobstacle(){
 
  obstacle = createSprite(600,375,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-(4 + score/100);
  obstacle.lifetime=150;
  obstacleGroup.add(obstacle);
}



