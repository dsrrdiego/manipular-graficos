'use strict';
const canvas=document.getElementById('canvas');
const ctx=document.getElementById('canvas').getContext('2d',{ willReadFrequently: true });

canvas.addEventListener('mousemove',function(e){nucleo(mouseMove,e)});
canvas.addEventListener('mousedown',function(e){nucleo(mouseDown,e);})
canvas.addEventListener('mouseup',function(){modo='normal',selectorRectangular.activo=false}); 
canvas.addEventListener('click',function(e){ nucleo(clickete,e)});

document.addEventListener("keydown", (e)=>{nucleo(tecla,e)});

const  figura=[];
let modo='normal'; //modo del mouse, normal , arrastrando o selectorRectangular
let arrastrando=false; //bandera para evitar que se selecciones al arrastrar
const oscuridad=0; //graduar la oscuridad del fondo
const selectorRectangular=new SelectorRectangular(ctx);
let fondoGris;
let fondoGrisOriginal;

/*inicio*/
const imagen=new Image();
imagen.src='fondo';
imagen.onload=function(){
    imagen.crossOrigin = "Anonymous";
    ctx.drawImage(imagen,0,0);
    fondoGris=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    borrarPantalla();
    refresh();
    fondoGrisOriginal=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    borrarPantalla();
    refresh();
    const fondoColor=ctx.createPattern(imagen,'repeat');
    const sombra=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    sombra.addColorStop(0,'red');
    sombra.addColorStop(1,'green');
    
    //dibujar 10 figuras aleatorias
    for (let i=0;i<10;i++){
        const figuraTipo=Math.floor(Math.random()*2);
        dibujarFiguraAleatoria(figuraTipo,i,fondoColor,sombra);
    }
    borrarPantalla();
    refresh();
}

//** sector mouse y teclado*/
function mouseMove(e){
    arrastrando=false;
    const fig=mouseCheck(e);
    switch (modo){
        case 'normal':
            if (fig) fig.sombrear=true;
            break;

        case 'arrastrar':
            figura.forEach(f=>{
                if (f.seleccionado) f.mover(e.movementX,e.movementY);
            })
            arrastrando=true;
            if (fig) fig.mover(e.movementX,e.movementY);
            break;
            
        case 'selectorRectangular':
            arrastrando=true;
            selectorRectangular.setFin(e.layerX,e.layerY);
            selectorRectangular.check(figura,e.ctrlKey);
            break;
    }
}

function mouseCheck(e){
    for (let i=0;i<10;i++){
        const fig=figura[i].mouseCheck(e.layerX-12,e.layerY-12);
        if (fig) return fig;
    }
}

function clickete(e){
    let bandera=null;
    if (!arrastrando){
        figura.forEach(f => {
            if (f.mouseCheck(e.layerX,e.layerY)){
                f.seleccionar();
                bandera=true;
            }
        });
        if (!bandera) desSelecionarTodo();  
    }
}


function mouseDown(e){
    if (mouseCheck(e)){ modo='arrastrar';}
    else{
        modo='selectorRectangular'
        selectorRectangular.setCoords(e.layerX,e.layerY);
    }
}


function tecla(e){
    let x=0;
    let y=0;
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
    
}
/* fin sector mouse y teclado*/


function engrisar(img){
    for (let i=0;i<img.width *img.height*4;i+=4){ 
        const prom=(img.data[i]+img.data[i+1]+img.data[i+2])/3;
        img.data[i]=prom   -oscuridad;
        img.data[i+1]=prom -oscuridad;
        img.data[i+2]=prom -oscuridad;
    }
    return img;
}

function nucleo(funcion,e){
    borrarPantalla();
    funcion(e);
    refresh();
}

function desSelecionarTodo(){
    figura.forEach(f=>{f.seleccionado=false});
}

function borrarPantalla(){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.putImageData(fondoGris,0,0);
    figura.forEach(f=>{f.sombrear=false;})
}

function refresh(){
    figura.forEach(f =>f.dibujar());
    if (selectorRectangular.activo) selectorRectangular.dibujar();
}


function dibujarFiguraAleatoria(tipo, indice,fondo,sombra){
    const ancho=Math.floor(Math.random()*100)+20;
    const alto=Math.floor(Math.random()*100)+20;
    const x=Math.floor(Math.random()*canvas.width-ancho*2)+ancho;
    const y=Math.floor(Math.random()*canvas.height-alto*2)+alto;
    
    switch (tipo){
        case 0:
            figura[indice]=new Rectangulo(x,y,ancho,alto,fondo,sombra,ctx);
            break;
        case 1:
            figura[indice]=new Circulo(x,y,ancho,fondo,sombra,ctx);
            break;
        //figura 2,
        //figura 3,
        }

    }
    

/*******instrucciones */
document.getElementById('instrucciones').addEventListener('click',()=>{
    alert('* Arrastre las figuras para ver los colores de fondo. \n *Clickee de a uno para hacer seleccion multiple o dibuje un rectangulo con el mouse. \n *Tecla control para incluir otro rectángulo. \n *Utilice el mouse o las flechas para mover. \n *Aplique filtros de colores.')});
