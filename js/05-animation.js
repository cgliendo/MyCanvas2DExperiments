
document.title = 'animation'
const canvas = document.querySelector('#mycanvas')

let DOCWIDTH = window.innerWidth -2
let DOCHEIGHT = window.innerHeight -2

canvas.width = DOCWIDTH
canvas.height =  DOCHEIGHT

const ctx = canvas.getContext('2d');

const timeout = 30000
let keepDrawing = 1


//16x16 grid
const unitwidth = 24
let u = DOCWIDTH / unitwidth;;

function init(){
    window.requestAnimationFrame(draw)
}

const sq = {
    x: 0,
    y: 0 
}

let timeoutID = window.setTimeout(()=>{keepDrawing=0}, timeout)
window.addEventListener('click',()=>{
    let old = keepDrawing
    keepDrawing = 1;
    window.clearTimeout(timeoutID)
    timeoutID = window.setTimeout(()=>{keepDrawing=0}, timeout)
    if(old==0) draw()
    // console.log(keepDrawing)
} )
const time = new Date()

function draw(){
    if(keepDrawing){
        ctx.clearRect(0,0,DOCWIDTH,DOCHEIGHT)
        ctx.fillStyle = 'tomato'
        ctx.fillRect(sq.x , sq.y, 2*u, 2*u)
        
        let dt = time.getMilliseconds() / 1000
        let dx = u * dt;
        let dy = u * dt;
        
        if(sq.x<=DOCWIDTH)
            sq.x = sq.x + dx
        else{
            sq.x = 0
            sq.y = 0 
        }
        if(sq.y<=DOCHEIGHT)
            sq.y = sq.y + dy
        else{
            sq.x = 0
            sq.y = 0 
        }
        
        window.requestAnimationFrame(draw)
            
    }
}


init()