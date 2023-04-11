
class Figura{
    constructor(x,y,ancho,alto,fondo,sombra,ctx){
        this.x=x;
        this.y=y;
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
        if (x < this.x-this.ancho/2 && x+w> this.x+this.ancho/2
            && y<this.y-this.alto/2 && y+h> this.y+this.alto/2
                && !this.seleccionado) this.seleccionar();
    }
    
}

class Circulo extends Figura{
    constructor(x,y,radio,nada,fondo,sombra,ctx){
        super (x,y,radio*2,radio*2,fondo,sombra,ctx);
        this.radio=radio;
    }
    dibujar(){
        super.dibujar();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
        this.ctx.fill();
        if (this.seleccionado) this.ctx.stroke();
        this.ctx.closePath();
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
        super (x,y, ancho, alto,fondo,sombra,ctx);
    }
    dibujar(){
        super.dibujar();
        this.ctx.fillRect(this.x-this.ancho/2,this.y-this.alto/2,this.ancho,this.alto);
        if (this.seleccionado){
            this.ctx.strokeRect(this.x-this.ancho/2,this.y-this.alto/2,this.ancho,this.alto);
        }
    }

    mouseCheck(x,y){
        if (x>this.x && x < this.x+this.ancho
            && y>this.y && y<this.y+this.alto) {
                return this }
            else {return false};

    }
}

class Rombo extends Figura{
    constructor(x,y,seudoRadio,nada,fondo,sombra,ctx){
        super (x,y, seudoRadio*2,seudoRadio*2,fondo,sombra,ctx);
        this.seudoRadio=seudoRadio;
    }
    dibujar(){
        super.dibujar();

        //4 puntos de izq a derecha sentido horario
        
        let x=[];let y=[];
        x[0]=this.x-this.seudoRadio   ; y[0]=this.y;
        x[1]=this.x                   ; y[1]=this.y-this.seudoRadio;
        x[2]=this.x+this.seudoRadio   ; y[2]=this.y;
        x[3]=this.x                   ; y[3]=this.y+this.seudoRadio;
        this.ctx.beginPath();
        this.ctx.moveTo(x[0],y[0]);
        for (let i=1;i<5;i++) this.ctx.lineTo(x[i],y[i]);
        this.ctx.lineTo(x[0],y[0]);
        this.ctx.fill();
        if (this.seleccionado) this.ctx.stroke();
        this.ctx.closePath();
    }

    mouseCheck(x,y){
        const difX=Math.abs(this.x-x);
        const difY=Math.abs(this.y-y);
        if (x>this.x-this.seudoRadio+difY
            &&x< this.x+this.seudoRadio-difY
            &&y>this.y-this.seudoRadio+difX
            &&y<this.y+this.seudoRadio-difX) return this;

    }
}
