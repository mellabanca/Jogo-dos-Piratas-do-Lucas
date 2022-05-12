class Bomba {
    constructor(posX,posY){
        this.raio = 30;
        var options = {
            isStatic: true
        }
        this.corpo = Bodies.circle(posX, posY, this.raio, options);
        this.rastro = [];
        this.imagem = loadImage("./assets/cannonball.png");
        World.add(world,this.corpo);
    }

    mostrar(){
        var pos = this.corpo.position;

        push();
        imageMode(CENTER);
        image(this.imagem, pos.x, pos.y, this.raio, this.raio);
        pop();

        if(this.corpo.velocity.x > 0 && pos.x > 10){
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
}