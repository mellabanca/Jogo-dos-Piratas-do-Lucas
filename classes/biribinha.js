class Biribinha {
    constructor(posX, posY, lar, alt, ang){
        this.posX = posX;
        this.posY = posY;
        this.lar = lar;
        this.alt = alt;
        this.ang = ang;
        this.estrutura = loadImage("./assets/cannonBase.png");
        this.lancador = loadImage("./assets/canon.png");
    }

    mostrar(){
     push();
     imageMode(CENTER);
     image(this.lancador,this.posX,this.posY,this.lar,this.alt);
     pop();
     image(this.estrutura,70,20,200,200);
    }
}