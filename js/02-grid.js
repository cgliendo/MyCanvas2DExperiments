
document.title = 'grid'
const canvas = document.querySelector('#mycanvas')

let DOCWIDTH = window.innerWidth -2
let DOCHEIGHT = window.innerHeight -2

canvas.width = DOCWIDTH
canvas.height =  DOCHEIGHT

const ctx = canvas.getContext('2d');

// console.log(ctx)


//grid
const unitwidth = 24
let u;

if(DOCWIDTH>DOCHEIGHT)
    u = DOCWIDTH / unitwidth;
else{
    u = DOCHEIGHT / unitwidth;
}
// let ny = DOCHEIGHT / unitwidth;

ctx.strokeStyle = '#313131'
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


ctx.fillStyle = 'tomato'
ctx.fillRect(0.2*u,.5*u,2*u,2*u)

ctx.fillStyle = 'lightblue'
ctx.fillRect(8*u,3*u,5*u,5*u)
