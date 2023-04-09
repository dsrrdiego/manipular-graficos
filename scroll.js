class Barra{
    constructor(ctx, ancho,alto,fill,funcion,indice){
        this.ctx=ctx
        this.ancho=ancho;
        this.alto=alto;
        this.fill=ctx.createLinearGradient(0,0,ancho,10);
        this.fill.addColorStop(0,'black');
        this.fill.addColorStop(1,fill);
        this.funcion=funcion;
        this.indice=indice;
        this.dibujar(ancho/2);
    }
    borrarme(){
        this.ctx.fillStyle='#ffffff';
        this.ctx.fillRect(0,0,this.ancho,this.alto);
    }
    dibujar(x){
        this.borrarme();
        this.ctx.fillStyle=this.fill;
        this.ctx.fillRect(10,10,this.ancho-10,7);
        this.ctx.beginPath();
        this.ctx.arc(x,13,10,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    mover(e){
        if (this.mouseDown) {
            this.dibujar(e.layerX);            
            const calculo=Math.floor(e.layerX*255/this.ancho)-127;
            
            this.funcion(calculo,this.indice);
        }
    }
}