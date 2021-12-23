 
var knife;
var alien1
var fruit1
var fruit2
var fruit3
var fruit4 
var fruitgroup
var gamestate="play"
var obsgroup
var score=0
var obscounter=0
var fruitcounter=5
var timer=0
function preload(){
  alien1=loadImage('assets/alien1.png')
  fruit1=loadImage('assets/apple.png')
  fruit2=loadImage('assets/banana.png')
  fruit3=loadImage('assets/pear.png')
  fruit4=loadImage('assets/orange.png')
  knifeimg=loadImage('assets/knife.png')
  gameoverimg=loadImage('assets/gameover.png')
  bgimg=loadImage('assets/bg.jpg')
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  knife=createSprite(13,13,13,13)
  knife.addImage(knifeimg)
knife.scale=0.4

fruitgroup=createGroup()
obsgroup=createGroup()
}

function draw() {
  background(bgimg); 


  if(gamestate=="play"){
    knife.x=mouseX 
    knife.y=mouseY  
   if(timer==60){
     gamestate='win'
   }
   timer=Math.ceil(frameCount/40) 
    for (var i = 0; i <fruitgroup.length; i++) {
      if(fruitgroup.isTouching(knife)){
        fruitgroup.get(i).destroy()
        score += 100 
      }
    }
    spawnFruits()
    obstacle()
if(obscounter<=5){
  for (var i = 0; i <obsgroup.length; i++) {
    if(obsgroup.collide(knife)){
      obsgroup.get(i).destroy()
obscounter=obscounter+1

    }
  }
}
  if(obscounter==5){
    gamestate="end"
  }
  }
else if (gamestate=="end"){
  knife.addImage(gameoverimg)
  knife.scale=2
  knife.x=width/2
  knife.y=height/2
  fruitgroup.destroyEach()
}
if(gamestate=='win'){
fruitgroup.destroyEach()
obsgroup.destroyEach()
knife.destroy()
textSize(70)
fill('orange')
stroke('black')
text('Good job',width/2-150,height/2)

}
textSize(20)
fill('blue')
text("Obstacles hit : " + obscounter,width-200,80)    
text('Score:'+score,width-200,50)

text("Time : " +timer, width/2,50);

drawSprites();




}
function spawnFruits(){
  if(World.frameCount%15===0){
    fruit=createSprite(213,-10,10,10)
    fruit.velocityY = 25;
    fruit.x=random(100,width-100)
    fruit.scale=0.2
    var randomfruit=Math.round(random(1,4))
    if(randomfruit===1){
      fruit.addImage(fruit1)
      fruit.scale=0.08
    }
else if (randomfruit==2){
fruit.addImage(fruit2)
}  
else if (randomfruit==3){
  fruit.addImage(fruit3)
  }  
  else {
    fruit.addImage(fruit4)
    }
    fruit.lifetime=height/25
    fruitgroup.add(fruit)


  }
}
function obstacle(){
  if(World.frameCount%70===0){
    obs=createSprite(213,-10,10,10)
    obs.velocityY = 25;
    obs.x=random(100,width-100)
    obs.scale=1 
    obs.addImage(alien1)
    obsgroup.add(obs)
    obs.lifetime=height/25
}
}