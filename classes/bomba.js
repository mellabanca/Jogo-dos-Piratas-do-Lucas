class Bomba {
    constructor(posX,posY){
        this.raio = 30;
        var options = {
            isStatic: true
        }
        this.corpo = Bodies.circle(posX, posY, this.raio, options);
        this.rastro = [];
        this.imagem = loadImage("./assets/cannonball.png");
        this.speed = 0.05;
        this.animation = [this.imagem];
        this.afundando = false;
        World.add(world,this.corpo);
    }
    animar(){
        this.speed += 0.05;
    }
    mostrar(){
        var pos = this.corpo.position;
        var index = floor(this.speed % this.animation.length);

        push();
        imageMode(CENTER);
        image(this.animation[index], pos.x, pos.y, this.raio, this.raio);
        pop();

        if(this.corpo.velocity.x > 0 && pos.x > 10 && !this.afundando){
            var position = [pos.x, pos.y];
            this.rastro.push(position);
        }

        for(var i = 0; i < this.rastro.length; i++){
            image(this.imagem, this.rastro[i][0],this.rastro[i][1],5,5);
        }
    }
    pular(){
        var newAngle = biribinha.ang - 28;
         newAngle = newAngle*(3.14/180); 
         var velocity = p5.Vector.fromAngle(newAngle);
          velocity.mult(0.5);
        Matter.Body.setStatic(this.corpo, false);
        Matter.Body.setVelocity(this.corpo, {x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)});
        }

    sumiu(index){
        this.afundando = true;
            Matter.Body.setVelocity(this.corpo, {x:0, y: 0});

            this.animation = aguaAnimation;
            this.speed = 0.05;
            this.raio = 150
            setTimeout(()=>{
                Matter.World.remove(world,this.corpo);
                delete baladecanhao[index];
            },1000)
           
        }
}