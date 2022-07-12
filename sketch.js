var background, human, invisibleGround, obstacle
var score = 0
var GameState = PLAY


function preload(){
//IMAGES
  standing = loadImage("assets/standing.png")
  obstacle1 = loadImage("assets/obstacle1.png")
  obstacle2 = loadImage("assets/obstacle2.png")
  flower1 = loadImage("assets/flower1.png")
  flower2 = loadImage("assets/flower2.png")
  flower3 = loadImage("assets/flower3.png")
  picking = loadImage("assets/picking.png")
  resetImage = loadImage("assets/reset.png")
  backgroundImage = loadImage("assets/background.jpg")

//ANIMATIONS
  walking = loadAnimation("assets/walking1.png", "assets/walking2.png", "assets/walking3.png")
  collided = loadAnimation("assets/fallover1.png","assets/fallover2.png")



}

function setup(){
createCanvas(1000,400)

//human
  human = createSprite(200,350,10,15)
  human.addImage("standing",standing)
  human.addAnimation("walking",walking)
  human.addAnimation("collided",collided)
  human.scale = 0.6


//reset button
  resetbutton = createSprite(200,10,10,15)
  resetbutton.addImage("reset", resetImage)


//Invisible Ground
  invisibleGround = createSprite(500,405,1000,10);
  invisibleGround.visible = false;

//backgroundImg = createSprite(500,200,1000,400)
//backgroundImg.addImage("background", backgroundImage)
//backgroundImg.scale = 2.7

obstaclesGroup = createGroup()
flowerGroup = createGroup()
}

function draw(){
background("pink")

if(GameState === PLAY){
  //Human jumping and gravity
    if(keyDown("space")&& human.y >= 200) {
      human.velocityY = -15;
      human.changeAnimation("walking",walking)
    }
  human.velocityY = human.velocityY+0.7

  //Collision with invisible ground
    human.collide(invisibleGround)

  //reset set to false
    resetbutton.visible = false

  spawnObstacles()
  spawnFlowers()


  if(obstaclesGroup.isTouching(human)){
    GameState = END
  }
}
else if(GameState === END){
  reset.visible = true;
  //change the human animation
    human.changeAnimation("collided",collided);

  //Velocity X and Y set to 0
    human.velocityY = 0

  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    flowerGroup.setLifetimeEach(-1);
    flowerGroup.setVelocityXEach(0);

  //if reset button pressed 
    if(mousePressedOver(resetbutton)){
    reset()
  }
}




drawSprites()
}


  


function spawnObstacles(){
  //Spawning obstacles
  if(frameCount % 230 === 0){
    obstacle = createSprite(1000,385,10,15)
    obstacle.velocityX = -3
    obstacle.scale = 0.1

    //generating obstacles at random
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
     case 2: obstacle.addImage(obstacle2);
              break;
      default: break;

      obstaclesGroup.add(obstacle)
      obstacle.depth = human.depth
      human.depth = human.depth+1
  }

}
}

function spawnFlowers(){
  //Spawning obstacles
  if(frameCount % 170 === 0){
    obstacle = createSprite(1000,385,10,15)
    obstacle.velocityX = -2.8
    obstacle.scale = 0.1

    //generating obstacles at random
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: flower.addImage(flower2)
              break;
      case 2: flower.addImage(flower2)
              break;
      case 3: flower.addImage(flower2)
              break;
      default: break;

      flowerGroup.add(flower)
  }
}
}


function reset(){
  GameState = PLAY
  obstaclesGroup.destroyEach()
  flowerGroup.destroyEach()
  resetbutton.visible = false
  human.changeAnimation("walking", walking)
  score = 0
}
