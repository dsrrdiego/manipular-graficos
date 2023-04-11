'use strict';
const canvas=document.getElementById('canvas');
const ctx=document.getElementById('canvas').getContext('2d',{ willReadFrequently: true });


const imagen=new Image();imagen.crossOrigin = "Anonymous";imagen.src='fondo.jpg';
const figura=[];
const selectorRectangular=new SelectorRectangular(ctx);
let arrastrando=false; //bandera para evitar que se selecciones al arrastrar
let modo='normal'; //modo del mouse, normal , arrastrando o selectorRectangular
let mouse={};

imagen.onload=function(){
    
    //fondo gris que se va a usar:
    ctx.drawImage(imagen,0,0);
    globalThis.fondoGris=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    
    borrarPantalla();
    refresh();

    // fondo para mantener original para aplicar los filtros a partir de este:
    globalThis.fondoGrisOriginal=engrisar(ctx.getImageData(0,0,canvas.width,canvas.height));
    borrarPantalla();
    refresh();

    //patron relleno color:
    const fondoColor=ctx.createPattern(imagen,'repeat');
    
    //patron relleno para el mouseOver.
    const sombra=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    sombra.addColorStop(0,'#ff000050');
    sombra.addColorStop(1,'#50ff0050');
    
    //dibujar 10 figuras aleatorias
    for (let i=0;i<10;i++) dibujarFiguraAleatoria(i,fondoColor,sombra);
    borrarPantalla();
    refresh();
    
    //asignar los eventos:
    canvas.addEventListener('mousemove',function(e){mouse=e});
    canvas.addEventListener('mousedown',function(e){nucleo(mouseDown,e);})
    canvas.addEventListener('mouseup',function(){modo='normal',selectorRectangular.activo=false}); 
    canvas.addEventListener('click',function(e){ nucleo(clickete,e)});
    canvas.addEventListener('dblclick',function(e){ nucleo(dblClickete,e)});
    document.addEventListener("keydown", (e)=>{nucleo(tecla,e)});
    setInterval(function(){nucleo(mouseMove,mouse)},1);
}

//** sector mouse y teclado**********************************************************************/
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

function dblClickete(e){
        figura.forEach(f => {
            if (f.mouseCheck(e.layerX,e.layerY)){
                f.dblClick();
            }
        });
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

/* fin sector mouse y teclado********************************************************************/


function nucleo(funcion,e){
    borrarPantalla();
    funcion(e);
    refresh();
}

function engrisar(img){
    for (let i=0;i<img.width *img.height*4;i+=4){ 
        const prom=(img.data[i]+img.data[i+1]+img.data[i+2])/3;
        img.data[i]=prom;
        img.data[i+1]=prom;
        img.data[i+2]=prom;
    }
    return img;
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

function dibujarFiguraAleatoria(indice,fondo,sombra){
    const figuraTipo=[Rectangulo,Circulo,Rombo];
    const tipo=Math.floor(Math.random()*3);
    const ancho=Math.floor(Math.random()*100)+20;
    const alto=Math.floor(Math.random()*100)+20;
    const x=Math.floor(Math.random()*canvas.width-ancho*2)+ancho; //o radio, depende de la figura
    const y=Math.floor(Math.random()*canvas.height-alto*2)+alto;
    
    figura[indice]=new figuraTipo[tipo](x,y,ancho,alto,fondo,sombra,ctx);
}


/*******instrucciones ************************************************/
document.getElementById('instrucciones').addEventListener('click',()=>{
    alert('* Arrastre las figuras para ver los colores de fondo. \n *Clickee de a uno para hacer seleccion multiple o dibuje un rectangulo con el mouse. \n *Tecla control para incluir otro rectángulo. \n *Utilice el mouse o las flechas para mover. \n *Aplique filtros de colores.')});
        