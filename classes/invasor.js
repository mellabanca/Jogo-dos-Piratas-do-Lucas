class Invasor {
    constructor(posX, posY, lar, alt, invasorPos){
        this.corpo = Bodies.rectangle(posX, posY, lar, alt);
        this.lar = lar;
        this.alt = alt;
        this.invasorPosition = invasorPos;
        this.imagem = loadImage("./assets/boat.png");
        World.add(world,this.corpo);
    }

    mostrar(){
        var pos = this.corpo.position;
        var ang = this.corpo.angle;

        push();
        translate(pos.x, pos.y);
        rotate(ang);
        imageMode(CENTER);
        image(this.imagem, 0, this.invasorPosition, this.lar, this.alt);
        pop();
    }
}