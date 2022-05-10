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
}