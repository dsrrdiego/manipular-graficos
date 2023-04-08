const canvas=document.getElementById('canvas');
const ctx=document.getElementById('canvas').getContext('2d');
canvas.addEventListener('mousemove',function(e){mouseCheck(e)});
canvas.addEventListener('mousedown',function(){modo='arrastrar'});
canvas.addEventListener('mouseup',function(){modo='normal';}); 
canvas.addEventListener('click',function(e){ clickete(e)});

document.addEventListener("keydown", (e)=>{tecla(e)});

const imagen=new Image();
imagen.src='assets/fondo';
let fondoColor;
var fondoGris=ctx.getImageData(0,0,10,10);
imagen.onload=function(){
    ctx.drawImage(imagen,0,0);
    fondoGris=ctx.getImageData(0,0,1000,1000);
    engrisar();
    fondoColor=ctx.createPattern(imagen,'repeat');
    for (i=0;i<10;i++){
        const figuraTipo=Math.floor(Math.random()*2);
        dibujarFiguraAleatoria(figuraTipo,i);
    }
    
    
}
function engrisar(){
    for (let i=0;i<fondoGris.width *fondoGris.height*4;i+=4){ 
        const prom=(fondoGris.data[i]+fondoGris.data[i+1]+fondoGris.data[i+2])/3;
        fondoGris.data[i]=prom;
        fondoGris.data[i+1]=prom;
        fondoGris.data[i+2]=prom;

    }


}

const  figura=[];
let modo='normal';
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
let arrastrando=false;
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
}


function borrarPantalla(){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.putImageData(fondoGris,0,0);
    refresh();
}

function refresh(){
    figura.forEach(f =>f.dibujar());
}


function dibujarFiguraAleatoria(tipo, indice){
    const x=Math.floor(Math.random()*canvas.width-200);
    const y=Math.floor(Math.random()*canvas.height-200);
    const ancho=Math.floor(Math.random()*100)+20;
    const alto=Math.floor(Math.random()*100)+20;
    const colorR=Math.floor(Math.random()*200)+50;
    const colorG=Math.floor(Math.random()*255);
    const colorB=Math.floor(Math.random()*255);
    const fill="#"+colorR.toString(16)+colorG.toString(16)+colorB.toString(16);
    switch (tipo){
        case 0:
            
            figura[indice]=new Rectangulo(x,y,ancho,alto,fill,ctx);
            break;
            case 1:
                figura[indice]=new Circulo(x,y,ancho,fill,ctx);
                break;
            case 2:
                // console.log(2);
                break;
                default:
        }
        refresh();
    }
    
borrarPantalla();

//crear 10 figuras aleatorias
    
    
    
    
    
/*
const c1=new Circulo(20,20,10,'#0000FF',ctx);
c1.dibujar();

let grad1=ctx.createLinearGradient(10,90,200,90);
grad1.addColorStop(0,'white');
grad1.addColorStop(1,'blue');

const r1=new Rectangulo(180,80,20,20,'#af7025',ctx);
r1.dibujar();
const r2=new Rectangulo(0,110,30,30,grad1,ctx);
r2.dibujar();


let img=new Image(100,100);
img.src='img1.jpg';
img.onload=function (){
    let rellenoImagen=ctx.createPattern(img,'repeat');
    
    
    const c2=new Circulo(200,200,80,rellenoImagen,ctx);
    c2.dibujar(); 
//     ctx.drawImage(img,100,100);
}


class rombo{

    constructor(x,y,radio,ctxt){
        let img=ctxt.getImageData(x,y,x+radio,y-radio);
        console.log(img.width);
        for (let yy=0;yy<radio/2;yy++){
            
            for (let xx=radio-yy;xx<radio+yy;xx++){
                let index=(xx+yy*img.width)*4;
                img.data[index]=0;
                img.data[index+1]=250;
                img.data[index+2]=0;
            }
        }
        for (let yy=radio/2;yy<radio;yy++){
            
            for (let xx=20+radio+(yy-radio);xx<radio*2-(yy-radio)+radio/2;xx++){
                let index=(xx+yy*img.width)*4;
                img.data[index]=0;
                img.data[index+1]=250;
                img.data[index+2]=0;
            }
        }
        
        ctxt.putImageData(img,x-radio,y-radio);
        // ctxt.putImageData(img,0,0);

    }
}
const a =new rombo(50,50,25,ctx);
*/