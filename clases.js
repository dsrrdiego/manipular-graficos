
class Figura{
    constructor(x,y,ejeX,ejeY,ancho,alto,fondo,sombra,ctx){
        this.x=x;
        this.y=y;
        this.ejeX=ejeX;
        this.ejeY=ejeY;
        this.ancho=ancho;
        this.alto=alto;
        this.fill=fondo;
        this.sombra=sombra;
        this.ctx=ctx;
        this.ctx.lineWidth=2;
        this.ctx.strokeStyle='red';
        this.sombrear=false;
        this.seleccionado=false;
    }
    dibujar(){
        if (this.sombrear){ 
            this.ctx.fillStyle=this.sombra;
        }else{
            this.ctx.fillStyle=this.fill;
        }
    }

    seleccionar(){
        if (!this.seleccionado){
            this.seleccionado=true;
        } else{
            this.seleccionado=false;
        }
    }    
    mover(x,y){
        this.x+=x;
        this.y+=y;
    }
    chequearCon(x,y,w,h){ //si entra en el selector multiple
        if (x < this.ejeX-this.ancho/2 && x+w> this.ejeX+this.ancho/2
            && y<this.ejeY-this.alto/2 && y+h> this.ejeY+this.alto/2
                && !this.seleccionado) this.seleccionar();
    }
    
}

class Circulo extends Figura{
    constructor(x,y,radio,nada,fondo,sombra,ctx){
        super (x,y,x,y,radio*2,radio*2,fondo,sombra,ctx);
        this.radio=radio;
    }
    dibujar(){
        super.dibujar();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        if (this.seleccionado){
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
    marcar(){
        super.dibujar();
    }

    mouseCheck(x,y){
        if (Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2))<this.radio){
            return this;
        }else {
            return false;
        }
    }

}

class Rectangulo extends Figura{
    constructor(x,y,ancho,alto,fondo,sombra,ctx){
        super (x,y,x+ancho/2,y+alto/2, ancho, alto,fondo,sombra,ctx);
    }
    dibujar(){
        super.dibujar();
        this.ctx.fillRect(this.x,this.y,this.ancho,this.alto);
        if (this.seleccionado){
            this.ctx.strokeRect(this.x,this.y,this.ancho,this.alto);
        }
    }

    mouseCheck(x,y){
        if (x>this.x && x < this.x+this.ancho
            && y>this.y && y<this.y+this.alto) {
                return this }
            else {return false};

    }
}

