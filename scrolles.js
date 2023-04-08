
///******** */ barra roja
const canvasBarraRoja=document.getElementById('barraRoja');
const ctxBarraRoja=canvasBarraRoja.getContext('2d');
const barraRoja=new Barra(ctxBarraRoja,canvasBarraRoja.width,canvasBarraRoja.height,'#ff0000',enrojar);
canvasBarraRoja.addEventListener('mousedown',(e)=>{barraRoja.mouseDown=true});
canvasBarraRoja.addEventListener('mouseup',(e)=>{barraRoja.mouseDown=false});
canvasBarraRoja.addEventListener('mousemove',(e)=>{barraRoja.mover(e)});

function enrojar(v){
    img=fondoGris;
    copiar(fondoGrisOriginal,img);
    
    
    for (let i=0;i<img.width *img.height*4;i+=4){ 
        img.data[i]+= v;
    }
    borrarPantalla();
    refresh();
    
}
///******** */ barra verde
const canvasBarraVerde=document.getElementById('barraVerde');
const ctxBarraVerde=canvasBarraVerde.getContext('2d');
const barraVerde=new Barra(ctxBarraVerde,canvasBarraVerde.width,canvasBarraVerde.height,'#00ff00',enverdar);
canvasBarraVerde.addEventListener('mousedown',(e)=>{barraVerde.mouseDown=true});
canvasBarraVerde.addEventListener('mouseup',(e)=>{barraVerde.mouseDown=false});
canvasBarraVerde.addEventListener('mousemove',(e)=>{barraVerde.mover(e)});

function enverdar(v){
    img=fondoGris;
    copiar(fondoGrisOriginal,img);


    for (let i=0;i<img.width *img.height*4;i+=4){ 
        img.data[i+1]+= v;
    }
    borrarPantalla();
    refresh();
    
}
///******** */ barra Azul
const canvasBarraAzul=document.getElementById('barraAzul');
const ctxBarraAzul=canvasBarraAzul.getContext('2d');
const barraAzul=new Barra(ctxBarraAzul,canvasBarraAzul.width,canvasBarraAzul.height,'#0000ff',enazular);
canvasBarraAzul.addEventListener('mousedown',(e)=>{barraAzul.mouseDown=true});
canvasBarraAzul.addEventListener('mouseup',(e)=>{barraAzul.mouseDown=false});
canvasBarraAzul.addEventListener('mousemove',(e)=>{barraAzul.mover(e)});

function enazular(v){

    img=fondoGris;
    copiar(fondoGrisOriginal,img);

    for (let i=0;i<img.width *img.height*4;i+=4){ 
        img.data[i+2]+= v;
    }
    borrarPantalla();
    refresh();
}
/***** */
function copiar(origen,destino){
    for (let i=0;i<origen.width *origen.height*4;i+=4){ 
        destino.data[i]= origen.data[i];
    }
}