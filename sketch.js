const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var angulo;
var biribinha;
var engine, world, ground;
var figurinha;
var castelo, casteloImg;
var bomba;

function preload() {
  figurinha = loadImage("./assets/background.gif");
  casteloImg = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 castelo = Bodies.rectangle(160, 350, 160, 310, options);
 World.add(world,castelo);
 angulo = 20;
 biribinha = new Biribinha(180,110,130,100,angulo);

 bomba = new Bomba(biribinha.posX, biribinha.posY);
 
}

function draw() {
  background(189);
  image(figurinha, 0, 0, 1200, 600);

  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);

 push();
 imageMode(CENTER);
 image(casteloImg,castelo.position.x, castelo.position.y, 160, 310);
 pop();
   biribinha.mostrar();
   bomba.mostrar();
}
