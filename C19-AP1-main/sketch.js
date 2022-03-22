var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200,50,60);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState == "play") {
    if(keyDown("space")) {
      ghost.velocityY = -6
    }
    
    ghost.velocityY = ghost.velocityY + 0.8

    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 4;
    }

    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 4;
    }
    
    if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors()
    
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }
  }

  if (gameState == "end") {
    stroke("white")
    fill("red")
    textSize(42)
    text("tu é ruim xd", 230,250)
  }

  drawSprites()
}

function spawnDoors() {
  if(frameCount%240 == 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 800;
    doorsGroup.add(door);
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 2;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.debug = true;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }
}