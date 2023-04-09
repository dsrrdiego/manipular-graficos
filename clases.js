
class Figura{
    constructor(x,y,fondo,sombra,ctx){
        this.x=x;
        this.y=y;
        this.fill=fondo;
        this.sombra=sombra;
        this.ctx=ctx;
        this.ctx.lineWidth=2;
        this.ctx.strokeStyle='red';
    }
    dibujar(){
        this.ctx.fillStyle=this.fill;
    }

    seleccionar(){
        if (!this.seleccionado){
            this.fill=relleno;
            this.seleccionado=true;
        } else{
            this.fill=fondoColor;
            this.seleccionado=false;
        }
    }    
    mover(x,y){
        this.x+=x;
        this.y+=y;
    }
    
}

class Circulo extends Figura{
    constructor(x,y,radio,fondo,sombra,ctx){
        super (x,y,fondo,sombra,ctx);
        this.radio=radio;
    }
    dibujar(){
        super.dibujar();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    marcar(){
        super.dibujar();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    checkMouse(x,y){
        if (Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2))<this.radio){
            this.marcar();
            return this;
        }else {
            return false;
        }
    }
    setCoords(x,y){
        this.x=x;
        this.y=y;
    }
    chequearCon(x,y,w,h){

        if (x>x+w) {
            x=x+w;
            w*=-1;
        }
        if (y>y+h){
            y=y+h;
            h*=-1;
        }



        if (x < this.x-this.radio && x+w> this.x+this.radio
            && y<this.y-this.radio && y+h> this.y+this.radio) {
                if (!this.seleccionado) this.seleccionar();
                this.marcar();
            }
            


    }

}

class Rectangulo extends Figura{
    constructor(x,y,ancho,alto,fondo,sombra,ctx){
        super (x,y,fondo,sombra,ctx);
        this.ancho=ancho;
        this.alto=alto;
    }
    dibujar(){
        super.dibujar();
        this.ctx.fillRect(this.x,this.y,this.ancho,this.alto);
    }

    marcar(){
        this.ctx.strokeRect(this.x,this.y,this.ancho,this.alto);
    }

    checkMouse(x,y){
        if (x>this.x && x < this.x+this.ancho
            && y>this.y && y<this.y+this.alto) {
                this.marcar();
                return this }
            else {return false};

    }
    setCoords(x,y){
        this.x=x-this.ancho/2;
        this.y=y-this.alto/2;

    }
    
    
    chequearCon(x,y,w,h){

        if (x>x+w) {
            x=x+w;
            w*=-1;
        }
        if (y>y+h){
            y=y+h;
            h*=-1;
        }



        if (x < this.x && x+w> this.x+this.ancho
            && y<this.y && y+h> this.y+this.alto) {
                if (!this.seleccionado) this.seleccionar();
                this.marcar();
            }
            


    }

}

