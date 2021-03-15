var gameState="play";
var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock;
var invisibleGroup;

function preload() {
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
}
 
function setup() {
  canvas = createCanvas(displayWidth - 20. displayHeight - 30);
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  invisibleGroup=createGroup();
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  
}

function draw() {
  background(0);
  
  if(gameState=="play"){

    Camera.position.x = displayWidth/2;
    camera.position.y = displayHeight/2;
    
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3;
  }
   if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  if(ghost.isTouching(climbersGroup)){ 
    ghost.velocityY=0;                               
  }
  if(ghost.isTouching(invisibleGroup)||ghost.y>600){
    ghost.destroy(); 
    gameState="end";
  }
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoors();
  drawSprites();
  }
  if(gameState=="end"){
    stroke("yellow");
    fill("yellow");
    textSize=30;
    text("Game Over",230,250);
  }
}
 
function spawnDoors(){
  if(frameCount% 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,200));
    door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=door.velocityY;
    climber.lifetime=800;
    door.lifetime=800;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}



