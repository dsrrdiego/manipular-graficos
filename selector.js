
class SelectorRectangular{
    constructor(ctx){
        this.ctx=ctx;
        this.activo=false;
        this.ancho=0;
        this.alto=0;
    }
    setCoords(x,y){
        this.x=x;
        this.y=y;
        this.activo=true;
    }
    setFin(x,y){
        this.ancho=x-this.x;
        this.alto=y-this.y;

    }
    dibujar(){
        this.ctx.fillStyle='#90101070';
        this.ctx.fillRect(this.x,this.y,this.ancho,this.alto);
        this.ctx.strokeRect(this.x,this.y,this.ancho,this.alto);


    }
    check(fig, ctrl){
        //primero reordenar las coordenadas a pasar
        let x=this.x;
        let y=this.y;
        let ancho=this.ancho;
        let alto=this.alto;

        if (this.x>this.x+this.ancho) {
            x=this.x+this.ancho;
            ancho*=-1;
        }
        if (this.y>this.y+this.alto){
            y=this.y+this.alto;
            alto*=-1;
        }

        if (!ctrl) fig.forEach(f => {f.seleccionado=false;});
        fig.forEach(f => {
            f.chequearCon(x,y,ancho,alto);
        });


    }
}