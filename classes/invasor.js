class Invasor {
    constructor(posX, posY, lar, alt, invasorPos, bandoAnimation){
        this.corpo = Bodies.rectangle(posX, posY, lar, alt);
        this.lar = lar;
        this.alt = alt;
        this.invasorPosition = invasorPos;
        this.imagem = loadImage("./assets/boat.png");
        this.animacao = bandoAnimation;
        this.speed = 0.05;
        World.add(world,this.corpo);
    }

    animar(){
        this.speed += 0.05;
    }

    mostrar(){
        var pos = this.corpo.position;
        var ang = this.corpo.angle;
        var index = floor(this.speed % this.animacao.length);

        push();
        translate(pos.x, pos.y);
        rotate(ang);
        imageMode(CENTER);
        image(this.animacao[index], 0, this.invasorPosition, this.lar, this.alt);
        pop();
    }
    sumiu(index){
        setTimeout(()=>{
            Matter.World.remove(world,bando[index].corpo);
            delete bando[index];
        },2000)
       
    }
}
