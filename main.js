const canvas=document.getElementById('canvas');
const ctx=document.getElementById('canvas').getContext('2d',{ willReadFrequently: true });

canvas.addEventListener('mousemove',function(e){mouseCheck(e)});
canvas.addEventListener('mousedown',function(e){mouseDown(e);})
canvas.addEventListener('mouseup',function(){modo='normal',selectorRectangular.activo=false;borrarPantalla(),refresh()}); 
canvas.addEventListener('click',function(e){ clickete(e)});

document.addEventListener("keydown", (e)=>{tecla(e)});

const  figura=[];
let modo='normal'; //modo del mouse, normal , arrastrando o selectorRectangular
let fondoColor;
let fondoGris=ctx.getImageData(0,0,10,10);
let fondoGrisOriginal=ctx.getImageData(0,0,10,10);
let relleno; //gradiente para los seleccionados
let arrastrando=false; //bandera para evitar que se selecciones al arrastrar
const oscuridad=20; //graduar la oscuridad del fondo
const selectorRectangular=new SelectorRectangular(ctx);


const imagen=new Image();
imagen.src='assets/fondo';
imagen.onload=function(){
    ctx.drawImage(imagen,0,0);
    fondoGris=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    borrarPantalla();
    refresh();
    fondoGrisOriginal=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    borrarPantalla();
    refresh();
    fondoColor=ctx.createPattern(imagen,'repeat');
    relleno=ctx.createLinearGradient(0,00,canvas.width,canvas.height);
    relleno.addColorStop(0,'red');
    relleno.addColorStop(1,'green');
    
    //dibujar 10 figuras aleatorias
    for (i=0;i<10;i++){
        const figuraTipo=Math.floor(Math.random()*2);
        dibujarFiguraAleatoria(figuraTipo,i);
    }
    borrarPantalla();
    refresh();
    
    
}
function engrisar(img){
    for (let i=0;i<img.width *img.height*4;i+=4){ 
        const prom=(img.data[i]+img.data[i+1]+img.data[i+2])/3;
        img.data[i]=prom   -oscuridad;
        img.data[i+1]=prom -oscuridad;
        img.data[i+2]=prom -oscuridad;
    }
    return img;
}

function tecla(e){
    let x=0;y=0;
    switch (e.key){
        case 'ArrowUp':
            y-=10;
            break;
        case 'ArrowDown':
            y+=10;
            break;
        case 'ArrowLeft':
            x-=10;
            break;
        case 'ArrowRight':
            x+=10;
        }
        figura.forEach(f=>{
            if (f.seleccionado) f.mover(x,y);
    })
    borrarPantalla();
    refresh();
    
}

function clickete(e){
    if (!arrastrando){
        figura.forEach(f => {
            let obj=f.checkMouse(e.layerX,e.layerY)
            if (obj) {obj.seleccionar();refresh()}
        });  
    }
}

function mouseCheck(e){
    arrastrando=false;
    borrarPantalla();
    if (modo=='normal'){
        for (x=0;x<10 ;x++){
            obj=figura[x].checkMouse(e.layerX,e.layerY);
            if (obj) { return obj }
        }
    }
    else if (modo=='arrastrar'&& obj) {
        const Xoriginal=obj.x;
        const Yoriginal=obj.y;
        obj.setCoords(e.layerX,e.layerY);
        figura.forEach(f=>{
            if (f.seleccionado) f.mover(e.movementX,e.movementY);
        })
        arrastrando=true;
    }
    else if (modo=='selectorRectangular'){
        selectorRectangular.setFin(e.layerX,e.layerY);
        selectorRectangular.check(figura);
    }
}
function mouseDown(e){
    if (mouseCheck(e)){ modo='arrastrar';}
    else{
        modo='selectorRectangular'
        selectorRectangular.setCoords(e.layerX,e.layerY);
    }

}


function borrarPantalla(){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.putImageData(fondoGris,0,0);
    refresh();
}

function refresh(){
    figura.forEach(f =>f.dibujar());
    if (selectorRectangular.activo) selectorRectangular.dibujar();
}


function dibujarFiguraAleatoria(tipo, indice){
    const x=Math.floor(Math.random()*canvas.width-200);
    const y=Math.floor(Math.random()*canvas.height-200);
    const ancho=Math.floor(Math.random()*100)+20;
    const alto=Math.floor(Math.random()*100)+20;

    switch (tipo){
        case 0:
            
            figura[indice]=new Rectangulo(x,y,ancho,alto,ctx);
            break;
            case 1:
                figura[indice]=new Circulo(x,y,ancho,ctx);
                break;
            //figura 2,
            //figura 3,
        }

    }
    
borrarPantalla();


/*******instrucciones */
document.getElementById('instrucciones').addEventListener('click',()=>{
    alert('* Arrastre las figuras para ver los colores de fondo. \n *Clickee de a uno para hacer seleccion multiple o dibuje un rectangulo con el mouse. \n *Utilice el mouse o las flechas para mover. \n *Aplique filtros de colores.')});
