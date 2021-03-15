var doremonanimation,scaredimage,groundimage,ob1image,ob2image,ob3image, ob4image,hang1image,hang2image,obstaclegroup,PLAY,END,gamestate,firedora,restart,restartimage,start,startimage,stbimage,stb,diesound,jumpsound ;


function preload(){
doremonanimation=loadAnimation("doremon1.png","doremon2.png","doremon3.png","doremon4.png","doremon5.png","doremon6.png");
  scaredimage=loadAnimation("scared.png");
  firedora=loadAnimation("dorafire.png");
  groundimage=loadImage("background.jpg");
  ob1image=loadImage("ob1.png");
  ob2image=loadImage("ob2.png");
  ob3image=loadImage("ob3.png");
  ob4image=loadImage("ob4.png");
  hang1image=loadImage("hang1.png");
  hang2image=loadImage("hang2.png");
  restartimage=loadImage("dr.png");
  startimage=loadImage("start.png");
  stbimage=loadImage("stbimage.jpg");
  diesound=loadSound("die.mp3");
  jumpsound=loadSound("jump.mp3");
}
function setup() 
{ createCanvas(500,500);
 startscreen=createSprite(250,250,500,500);
startscreen.addImage(stbimage);
   startscreen.scale=3;
 stb=createSprite(210,360,10,10);
 stb.addImage(startimage);
 stb.scale=0.5;
  ground=createSprite(250,170,500,500);
 ground.visible=false;
 dora=createSprite(100,400,50,50);
 dora.visible=false;
 dora.addAnimation("d1",doremonanimation);
 dora.addAnimation("d2",scaredimage);
 dora.addAnimation("d3",firedora);
 dora.scale=0.5  ;
ground1=createSprite(250,500,500,10);
 ground1.visible=false;
 obstaclegroup=new Group();
 
 fwoodgroup=new Group();
 START=2;
 PLAY=1;
 END=0;
 gamestate=START;
 score=0;
 restart=createSprite(250,200,10,10);
 restart.addImage(restartimage);
 restart.visible=false;
 restart.scale=0.5;
 
}


function draw() 
{ 
background("black");
  
  if(gamestate===START){
   if(mousePressedOver(stb)){
     gamestate=PLAY;
   }
    
    
 }
  
   if (gamestate===PLAY){
     dora.visible=true;
     dora.scale=0.5;
     ground.visible=true;
     ground.addImage(groundimage);
     ground.scale=1.2;
     ground.velocityX=-10;
    if (keyDown("space")&&dora.y>=399){
    dora.velocityY=-20;
      jumpsound.play();
  }
    // console.log(dora.y);
    dora.velocityY=dora.velocityY+0.85;
    if (ground.x<0){
    ground.x=ground.width/2;
    
  }
     
     if(frameCount%80===0){
       var ob=Math.round(random(1,2))
       if (ob==1){
         fire();
       }    
       else if (ob==2){
         obstacles();
       }
     }
     if(fwoodgroup.isTouching(dora)){
       gamestate=END;
       dora.changeAnimation("d3",firedora);
       diesound.play();
     }
     if (obstaclegroup.isTouching(dora)){
      gamestate=END;
       dora.changeAnimation("d2",scaredimage);
       diesound.play();
      }
     
     score=score+Math.round(getFrameRate()/60);
     
     
  }
  
  
  if (gamestate===END){
    startscreen.visible=false;
    stb.visible=false;
    dora.visible=true;
    dora.scale=0.2;
    //ground.visible=false;
    dora.velocityY=0;
    ground.velocityX=0;
   // obstaclegroup.setVelocityXEach(0);
    //obstaclegroup.setLifetimeEach(-1);
    //obstacle.rotationSpeed=0;
    obstaclegroup.destroyEach();
    //fwoodgroup.setVelocityXEach(0);
    //fwoodgroup.setLifetimeEach(-1);
    fwoodgroup.destroyEach();
    restart.visible=true;
    
  }
  
  if (mousePressedOver(restart)){
    gamestate=PLAY;
    restart.visible=false;
    fwoodgroup.destroyEach();
    obstaclegroup.destroyEach();
    dora.changeAnimation("d1",doremonanimation);
    score=0;
  }
  
  
  
  
  
  
  dora.collide(ground1);
  
drawSprites();
  text("score:"+score,width-100,50); 
                }



function obstacles(){

    obstacle=createSprite(500,430,20,20);
    var a =Math.round(random(1,2));
    switch(a){

        
       case 1:obstacle.addImage(ob3image);
               break;
        
       case 2:obstacle.addImage(ob4image);
              break;
               
       default:break;
    }
    obstacle.velocityX=-10;
    obstacle.rotationSpeed=-40;
  obstacle.scale=0.8;
    obstaclegroup.add(obstacle);
    obstacle.lifetime=100;
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,70)
  
}
 
function fire(){

    fwood=createSprite(500,400,20,20);
    fwood.velocityX=-10;
    fwood.lifetime=100;
    fwood.addImage(ob2image);
    fwoodgroup.add(fwood);
    fwood.debug=false;
    fwood.setCollider("rectangle",0,0,50,60)
  
}


