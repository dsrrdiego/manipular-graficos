

///******** */ barra roja
const canvasBarraRoja=document.getElementById('barraRoja');
const ctxBarraRoja=canvasBarraRoja.getContext('2d');
const barraRoja=new Barra(ctxBarraRoja,canvasBarraRoja.width,canvasBarraRoja.height,'#ff0000',filtrar,0);
canvasBarraRoja.addEventListener('mousedown',(e)=>{barraRoja.mouseDown=true});
canvasBarraRoja.addEventListener('mouseup',(e)=>{barraRoja.mouseDown=false});
canvasBarraRoja.addEventListener('mousemove',(e)=>{barraRoja.mover(e)});
///******** */ barra verde
const canvasBarraVerde=document.getElementById('barraVerde');
const ctxBarraVerde=canvasBarraVerde.getContext('2d');
const barraVerde=new Barra(ctxBarraVerde,canvasBarraVerde.width,canvasBarraVerde.height,'#00ff00',filtrar,1);
canvasBarraVerde.addEventListener('mousedown',(e)=>{barraVerde.mouseDown=true});
canvasBarraVerde.addEventListener('mouseup',(e)=>{barraVerde.mouseDown=false});
canvasBarraVerde.addEventListener('mousemove',(e)=>{barraVerde.mover(e)});


///******** */ barra Azul
const canvasBarraAzul=document.getElementById('barraAzul');
const ctxBarraAzul=canvasBarraAzul.getContext('2d');
const barraAzul=new Barra(ctxBarraAzul,canvasBarraAzul.width,canvasBarraAzul.height,'#0000ff',filtrar,2);
canvasBarraAzul.addEventListener('mousedown',(e)=>{barraAzul.mouseDown=true});
canvasBarraAzul.addEventListener('mouseup',(e)=>{barraAzul.mouseDown=false});
canvasBarraAzul.addEventListener('mousemove',(e)=>{barraAzul.mover(e)});


/***** */
function copiar(origen,destino){
    for (let i=0;i<origen.width *origen.height*4;i+=4){ 
        destino.data[i]= origen.data[i];
    }
    
}

function filtrar(v,color){
    img=fondoGris;
    copiar(fondoGrisOriginal,img);
    for (let i=0;i<img.width *img.height*4;i+=4){ 
        img.data[i+color]+= (Math.max(Math.min(v,255),0));
    }
    borrarPantalla();
    refresh();
}