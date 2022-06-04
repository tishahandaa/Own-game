var background, human


function preload(){
//IMAGES
  standing = loadImage("assets/standing.png")
  obstacle1 = loadImage("assets/obstacle1.png")
  obstacle2 = loadImage("assets/obstacle2.png")
  flower1 = loadImage("assets/flower1.png")
  flower2 = loadImage("assets/flower2.png")
  flower3 = loadImage("assets/flower3.png")
  picking = loadImage("assets/picking.png")
  restartImage = loadImage("assets/reset.png")

//ANIMATIONS
  walking = loadAnimation("assets/walking1.png", "assets/walking2.png", "assets/walking3.png")
  collided = loadAnimation("assets/fallover1.png","assets/fallover2.png")
}

function setup(){
createCanvas(1000,400)

human = createSprite(200,350,10,15)
human.addImage("standing",standing)
human.scale = 0.6
}

function draw(){

  drawSprites()
}