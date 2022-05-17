//Revisão de Matrizes
//Matriz: variável que pode armazenar vários valores
//Exemplos de Matrizes
var matriz1 = [20,385,14,56];
//console.log(matriz1);

var matriz2 = ["Melissa", 26, "Lucas", true];
//console.log(matriz2);

var matriz3 = [[23,57]     ,      [78,12]];
//console.log(matriz3);

//console.log(matriz1[2]);
//console.log(matriz2[1]);
//console.log(matriz3[0][1]);

matriz1.push(1000);
matriz1.push(520);
//console.log(matriz1);




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
var baladecanhao=[];
var invasor;

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
 angleMode(DEGREES);
 angulo = 20;
 biribinha = new Biribinha(180,110,130,100,angulo);

 invasor = new Invasor(width-79, height-60, 170, 170, -80);
 
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
   for(var i=0; i<baladecanhao.length;i++ ){
     fogodeartificio(baladecanhao[i],i)
   }

   Matter.Body.setVelocity(invasor.corpo, {x: -0.9,y: 0});
   invasor.mostrar();
}
function keyReleased(){
  if(keyCode === 32){
    baladecanhao[baladecanhao.length-1].pular();
  }
}
function keyPressed(){
  if(keyCode === 32){
    var bomba = new Bomba(biribinha.posX, biribinha.posY);
    baladecanhao.push(bomba)
  }
}
function fogodeartificio (bomba,i ){
  if(bomba){
    bomba.mostrar();
  }
}