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
var falhainvasao=[];
var falhainvasaodados;
var tibum;
var aguaAnimation = [];
var aguaDados;
var aguaSpritesheet;
var terminou = false;
var contas
var paisagem
var mais1dia
var tiropelaculatra
var impostoderenda = false
//var corpopirata
//var imagempirata

function preload() {
  figurinha = loadImage("./assets/background.gif");
  casteloImg = loadImage("./assets/tower.png");
  bandoDados = loadJSON("./assets/boat/boat.json");
  bandoSpritesheet = loadImage("./assets/boat/boat.png");
  falhainvasaodados = loadJSON("./assets/boat/brokenBoat.json");
  tibum = loadImage("./assets/boat/brokenBoat.png");
  aguaDados = loadJSON("./assets/waterSplash/waterSplash.json");
  aguaSpritesheet = loadImage("./assets/waterSplash/waterSplash.png");
  mais1dia = loadSound("./assets/cannon_explosion.mp3");
  paisagem = loadSound("./assets/background_music.mp3");
  tiropelaculatra = loadSound("./assets/cannon_water.mp3");
  contas = loadSound("./assets/pirate_laugh.mp3");
  imagempirata = loadImage("./assets/pirata.png");
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
 var tibumframes = falhainvasaodados.frames;
 
 for(var i = 0; i < tibumframes.length; i++){
   var pos = tibumframes[i].position;
   var img = tibum.get(pos.x, pos.y, pos.w, pos.h);
   falhainvasao.push(img);
 }

 var aguaframes = aguaDados.frames;
 
 for(var i = 0; i < aguaframes.length; i++){
   var pos = aguaframes[i].position;
   var img = aguaSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
   aguaAnimation.push(img);
 }
}

function draw() {
  background(189);
  console.log(mouseY);
  image(figurinha, 0, 0, 1200, 600);
  if(!paisagem.isPlaying()){
    paisagem.play();
    paisagem.setVolume(0.1);
  
  }
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
    mais1dia.play();
    mais1dia.setVolume(0.3);
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
    bomba.animar();
    if(bomba.corpo.position.x>=width||bomba.corpo.position.y>=height-50){
      bomba.sumiu(i);
      if(bomba.afundando === true){
        tiropelaculatra.playMode("untilDone")
        tiropelaculatra.play();
        tiropelaculatra.setVolume(0.1);
      }
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
      var colizao = Matter.SAT.collides(castelo, bando[i].corpo);
      if(colizao.collided && !bando[i].by){
        //A imagem tem que ser colocada quando tiver a colisão
        //do navio com a torre
        //Não precisa nem ter o corpo do pirata, só a imagem :)
        image(imagempirata,128,400,100,100);
      if(!impostoderenda && !contas.isPlaying()){
        contas.play();
        contas.setVolume(0.3);
        impostoderenda = true
      }
        terminou = true;
        gameOver();
      }
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

  function gameOver(){
    swal({
      title: "A conta chegou!",
      text: "Obrigado por jogar!",
      imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar novamente"
    },
      function(botaoApertado){
        if(botaoApertado){
          location.reload();
        }
        }

    ) 
  }
