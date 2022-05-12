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
        if(keyIsDown(UP_ARROW)&&this.ang>-30 || keyDown("w")&&this.ang>-30){
            this.ang-=1;
        }
        if(keyIsDown(DOWN_ARROW)&&this.ang<70 || keyDown("s")&&this.ang<70){
            this.ang+=1;
        }
     push();
     translate(this.posX,this.posY);
     rotate(this.ang);
     imageMode(CENTER);
     image(this.lancador,0,0,this.lar,this.alt);
     pop();
     image(this.estrutura,70,20,200,200);
    }
}