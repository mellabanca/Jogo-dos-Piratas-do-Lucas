class Bomba {
    constructor(posX,posY){
        this.raio = 30;
        var options = {
            isStatic: true
        }
        this.corpo = Bodies.circle(posX, posY, this.raio, options);
        this.imagem = loadImage("./assets/cannonball.png");
        World.add(world,this.corpo);
    }

    mostrar(){
        var pos = this.corpo.position;

        push();
        imageMode(CENTER);
        image(this.imagem, pos.x, pos.y, this.raio, this.raio);
        pop();
    }
    pular(){
        var newAngle = biribinha.ang - 28;
         newAngle = newAngle*(3.14/180); 
         var velocity = p5.Vector.fromAngle(newAngle);
          velocity.mult(0.5);
        Matter.Body.setStatic(this.corpo, false);
        Matter.Body.setVelocity(this.corpo, {x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)});
        }
}