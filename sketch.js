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
var bando=[];
var bandoAnimation = [];
var bandoDados, bandoSpritesheet;

function preload() {
  figurinha = loadImage("./assets/background.gif");
  casteloImg = loadImage("./assets/tower.png");
  bandoDados = loadJSON("./assets/boat/boat.json");
  bandoSpritesheet = loadImage("./assets/boat/boat.png");
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

 var bandoFrames = bandoDados.frames;
 
 for(var i = 0; i < bandoFrames.length; i++){
   var pos = bandoFrames[i].position;
   var img = bandoSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
   bandoAnimation.push(img);
 }
 
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
     esbarrar(i);
   }

   bandoep()
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
    if(bomba.corpo.position.x>=width||bomba.corpo.position.y>=height-50){
      bomba.sumiu(i);
    }
  }
}
function bandoep (){
if (bando.length>0){
  var randola=random(250,300);
  if(bando[bando.length-1] === undefined || bando[bando.length-1].corpo.position.x<width-randola){
    var pos=[-40,-60,-70,-20];
    var pos2=random(pos);
    var invasor = new Invasor(width, height-100, 170, 170, pos2, bandoAnimation);
    bando.push(invasor);
  }
  for(var i=0; i<bando.length;i++ ){
    if(bando[i]){
      Matter.Body.setVelocity(bando[i].corpo, {x: -0.9,y: 0});
      bando[i].mostrar();
      bando[i].animar();
    }
  }
}else{
 var invasor = new Invasor(width, height-60, 170, 170, -80, bandoAnimation);
 bando.push(invasor);
}
}
function esbarrar(index){
  for(var i=0; i<bando.length;i++ ){
    if(baladecanhao[index]!== undefined && bando[i]!== undefined){
      var colizao=Matter.SAT.collides(baladecanhao[index].corpo,bando[i].corpo)
        if(colizao.collided){
          bando[i].sumiu(i);
          Matter.World.remove(world,baladecanhao[index].corpo);
          delete baladecanhao[index];
        }
      }
    }

  }
