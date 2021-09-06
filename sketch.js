var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var ghost2Img;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghost2Img = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

doorsGroup=new Group();
climbersGroup=new Group();
 invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }

    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    ghost.velocityY=ghost.velocityY+0.5;
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
    }

  SpawnDoors();
  drawSprites();
}
if(gameState==="end"){
  textSize(30)
  text("gameOver",230,250);
}
}

function SpawnDoors(){
  if (frameCount%400===0){
var Door = createSprite(200,-50);
    Door.addImage(doorImg);
    Door.x=Math.round(random(150,400));
    Door.velocityY= 1;
    Door.lifetime=800
    doorsGroup.add(Door);

    ghost.depth=Door.depth
    ghost.depth+=1;
    
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=Door.x
    invisibleBlock.velocityY=1;

var climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x
    climber.velocityY= 1;
    climber.lifetime=800
    climberGroup.add(climber);
    
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime=800
  }
}