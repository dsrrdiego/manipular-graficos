
class Figura{
    constructor(x,y,ctx){
        this.x=x;
        this.y=y;
        this.fill=fondoColor;
        this.ctx=ctx;
        this.ctx.lineWidth=4;
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
    constructor(x,y,radio,ctx){
        super (x,y,ctx);
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
    constructor(x,y,ancho,alto,ctx){
        super (x,y,ctx);
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
class Barra{
    constructor(ctx, ancho,alto){
        console.log('barra')
        this.ctx=ctx
        this.ancho=ancho;
        this.alto=alto;
        this.dibujar(ancho/2);
    }
    borrarme(){
        this.ctx.fillStyle='#ffffff';
        this.ctx.fillRect(0,0,this.ancho,this.alto);
    }
    dibujar(x){
        this.borrarme();
        this.ctx.fillStyle='#ff0000';
        this.ctx.fillRect(10,3,this.ancho-10,7);
        this.ctx.beginPath();
        this.ctx.arc(x,5,10,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    mover(e){
        if (this.mouseDown) {
            this.dibujar(e.layerX);            
            const calculo=Math.floor(e.layerX*255/this.ancho);
            enrojar(fondoGris,calculo);
            // console.log(e.layerX);
            
       }
    }
}