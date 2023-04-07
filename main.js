const canvas=document.getElementById('canvas');
const ctx=document.getElementById('canvas').getContext('2d');


const CANVASANCHO=1000;
const CANVASALTO=1000;
const  figura=[];

canvas.addEventListener('mousemove',function(e){
    borrar();
    let seleccionado=false;
    for (x=0;x<10 && !seleccionado;x++){
        if (figura[x].checkMouse(e.x,e.y)) {
            seleccionado=true;
            
        }
    }
    
    // console.log('mouser'+e.x+ '  '+e.y);
})

function borrar(){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,CANVASALTO,CANVASANCHO);
    refresh();
}

function refresh(){
    figura.forEach(f =>f.dibujar());
}


function dibujarFiguraAleatoria(tipo, indice){
    const x=Math.floor(Math.random()*CANVASANCHO-200);
    const y=Math.floor(Math.random()*CANVASALTO-200);
    const ancho=Math.floor(Math.random()*100)+20;
    const alto=Math.floor(Math.random()*100)+20;
    const colorR=Math.floor(Math.random()*200)+50;
    const colorG=Math.floor(Math.random()*255);
    const colorB=Math.floor(Math.random()*255);
    const fill='#'+colorR+colorG+colorB;
    
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
            // console.log('defa');
            
        }
        // figura[indice].dibujar();
        refresh();
    }
    
borrar();
for (i=0;i<10;i++){
    const figuraTipo=Math.floor(Math.random()*2);
    dibujarFiguraAleatoria(figuraTipo,i);
}
    
    
    
    
    
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