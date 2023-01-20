
document.title = 'taxicab-distance'
const canvas = document.querySelector('#mycanvas')

let DOCWIDTH = window.innerWidth -2
let DOCHEIGHT = window.innerHeight -2

canvas.width = DOCWIDTH
canvas.height =  DOCHEIGHT

const ctx = canvas.getContext('2d');

// console.log(ctx)

//16x16 grid
const unitwidth = 24
let u = DOCWIDTH / unitwidth;
// let ny = DOCHEIGHT / unitwidth;

//Draw grid
ctx.strokeStyle = '#212121'
for(let i = 0; i <= unitwidth; i++){
    //draw vertical
    ctx.beginPath()
    ctx.moveTo(i*u,0)
    ctx.lineTo(i*u,DOCHEIGHT)
    ctx.closePath()
    ctx.stroke()
    //draw horizontal
    ctx.beginPath()
    ctx.moveTo(0,i*u)
    ctx.lineTo(DOCWIDTH,i*u)
    ctx.closePath()
    ctx.stroke()
}


//Draw squares
let sq1 = {
    x: 2*u, 
    y: 3*u, 
    w: 2*u, 
    h: 2*u
}
let sq2 = {
    x: 15*u, 
    y: 10*u,
    w: 4*u, 
    h: 4*u
}

ctx.fillStyle = 'tomato'
ctx.fillRect(sq1.x,sq1.y,sq1.w,sq1.h)

ctx.fillStyle = 'teal'
ctx.fillRect(sq2.x,sq2.y,sq2.w,sq2.h)

//Distance
let pta = {
    x: sq1.x + sq1.w/2,
    y: sq1.y + sq1.h/2
}

let ptb = {
    x: sq2.x + sq2.w/2,
    y: sq2.y+ sq2.h/2
}

let dx = (ptb.x - pta.x)
let dy = (ptb.y - pta.y)

//Draw Line
ctx.strokeStyle = 'aqua'
//hypotanuse
// ctx.beginPath()
// ctx.moveTo(pta.x,pta.y)
// ctx.lineTo(ptb.x,ptb.y)
// ctx.closePath()
// ctx.stroke()

//vertical line
ctx.beginPath()
ctx.moveTo(pta.x,pta.y)
ctx.lineTo(pta.x, ptb.y)
ctx.closePath()
ctx.stroke();

//horizontal line
ctx.beginPath()
ctx.moveTo(pta.x,ptb.y)
ctx.lineTo(ptb.x, ptb.y)
ctx.closePath()
ctx.stroke();

//Draw Points
//Sq1 center
ctx.fillStyle = 'aqua'
ctx.beginPath()
ctx.arc(pta.x,pta.y, 0.125*u, 0, Math.PI*2)
ctx.fill()
//turnpoint
ctx.beginPath()
ctx.arc(pta.x,ptb.y, 0.125*u, 0, Math.PI*2)
ctx.fill()
//Sq2 center
ctx.beginPath()
ctx.arc(ptb.x,ptb.y, 0.125*u, 0, Math.PI*2)
ctx.fill()

//Calculate taxicab distance
let dist = (dx + dy)/u
console.log(dist)
// console.log(dist/unitwidth)

//Draw distance text
ctx.font = '2.5rem serif';
ctx.fillText(
    dist.toFixed(3),
    pta.x +0.5*u, 
    ptb.y -0.5*u
    );
