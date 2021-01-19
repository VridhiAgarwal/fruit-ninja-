var PLAY = 1;
var END = 0;
var gameState = 1;

var sword,fruit, monster,fruitGroup, enemyGroup, score, r,randomFruit;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var cutSound, gameOverSound;



function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  cutSound = loadSound("whoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
  
  
  
  
  
  
    
}

function setup() {
  sword = createSprite(200,40,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  

  
  
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  score = 0;
}

function draw(){
  background("lightgreen");
  
  
  if(gameState === PLAY){
   sword.x = World.mouseX;
   sword.y = World.mouseY;
    
    fruits();
    Enemy();
    
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
      gameOverSound.play();
      gameState = END;}
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
      cutSound.play();
      

    }
    
  }
  
  else if(gameState === END){
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    
    sword.addImage(gameOverImage);
    sword.x = 200;
    sword.y = 200;
  }
  
  
  

 
  drawSprites();
  
  text("Score: "+ score, 20,20);

}




function fruits() {
  if(World.frameCount%80 === 0){
    fruit = createSprite(400, 200, 20,20);
    fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    
    if(r == 1) {
      fruit.addImage(fruit1);
    } 
    else if(r == 2){
      fruit.addImage(fruit2);
    }
    else if(r == 3){
      fruit.addImage(fruit3);
    }
    else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,540));
    
    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
  
}

  function Enemy(){
   if(World.frameCount%200 === 0){
     monster = createSprite(400,200,20,20);
     monster.addAnimation("moving", monsterImage);
     monster.y= Math.round(random(100,300))
     monster.velocityX = -(8+(score/10));
     monster.setLifetime = 50;
     
     enemyGroup.add(monster);
     
   }

  }

