// relleno="#500000";


class Figura{
    constructor(x,y,fill,ctx){
        this.x=x;
        this.y=y;
        // this.fill=fill;
        this.fill=fondoColor;
        this.prevFill=fill;
        this.ctx=ctx;
        this.ctx.lineWidth=4;
        this.ctx.strokeStyle='red';
    }
    dibujar(){
        this.ctx.fillStyle=this.fill;
    }

    seleccionar(){
        if (!this.seleccionado){
            this.prevFill=this.fill;
            this.fill=relleno;
            // this.fill="#50000090";
            this.seleccionado=true;
        } else{
            this.fill=this.prevFill;
            this.seleccionado=false;

        }
    }    
    mover(x,y){
        this.x+=x;
        this.y+=y;
    }
    
}
class Circulo extends Figura{
    constructor(x,y,radio,fill,ctx){
        super (x,y,fill,ctx);
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
}

class Rectangulo extends Figura{
    constructor(x,y,ancho,alto,fill,ctx){
        super (x,y,fill,ctx);
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

}