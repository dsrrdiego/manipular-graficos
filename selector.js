
class SelectorRectangular{
    constructor(ctx){
        this.ctx=ctx;
        this.activo=false;
        this.width=0;
        this.height=0;
    }
    setCoords(x,y){
        this.x=x;
        this.y=y;
        this.activo=true;
    }
    setFin(x,y){
        this.width=x-this.x;
        this.height=y-this.y;

    }
    dibujar(){
        this.ctx.fillStyle='#90101070';
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.strokeRect(this.x,this.y,this.width,this.height);


    }
    check(fig){
        fig.forEach(f => {
            f.seleccionado=true;
            f.seleccionar();
        });
        fig.forEach(f => {
            f.chequearCon(this.x,this.y,this.width,this.height);
        });


    }
}