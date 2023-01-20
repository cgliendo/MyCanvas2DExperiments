
document.title = 'full-screen-canvas'
const canvas = document.querySelector('#mycanvas')

let DOCWIDTH = window.innerWidth -2
let DOCHEIGHT = window.innerHeight -2

canvas.width = DOCWIDTH
canvas.height =  DOCHEIGHT

const ctx = canvas.getContext('2d');

// console.log(ctx)

ctx.fillStyle = 'tomato'
ctx.fillRect(25,25,150,150)

ctx.fillStyle = 'lightblue'
ctx.fillRect(350,350,100,100)
