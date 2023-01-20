
document.title = 'animation-queue'
const canvas = document.querySelector('#mycanvas')

let DOCWIDTH = window.innerWidth -2
let DOCHEIGHT = window.innerHeight -2

canvas.width = DOCWIDTH
canvas.height =  DOCHEIGHT

const ctx = canvas.getContext('2d');

const timeout = 60000
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



/***********************************************************
 * Node - Basic node with VALUE and NEXT
 ***********************************************************/
 class Node  {
    next;
    value;
    constructor(value){
        this.value = value;
    }
}
/***********************************************************
 * Iterator - Basic interface for iterables, like lists
 ***********************************************************/
class Iterator{
    head;
    current;
    constructor(){
        // super();
        this.head = new Node(null);
        this.current = this.head
    }
    hasNext(){
        if(this.current.next != undefined)
            return true
        else
            return false
    }
    getNext(){
        this.current = this.current.next
        return this.current
    }
    resetIter(){
        this.current = this.head
    }
    isEmpty(){
        return (this.head.next==undefined)
    }
    /**
     * Print the list into the console. 
     */
    print = () => {
        this.resetIter();
        let str = '';
        let temp = this.current
        // let curr = this.head.next;
        while(this.hasNext()){
            temp = this.getNext()
            str += temp.value
            if(this.hasNext()) str += ' -> '    
        }
        console.log(str)
    }
}
/***********************************************************
 * Queue - First in First Out
 ***********************************************************/
class Queue extends Iterator{
    /**
     * Add an item of (value) to the end of the list
     */
    append = (value)=>{
        let temp = this.head;
        while(this.hasNext()){
            temp=this.getNext()
        }
        temp.next = new Node(value)
    }
    /**
     * Add an item of (value) to the end of the queue.
     * Same as .append()
     */
    enqueue = (value)=> {
        this.append(value)
    }
    /**
     * Remove and return the next item in the queue
     * @returns next item in the queue
     */
    dequeue = () => {
        if(!this.isEmpty()){
            let temp = this.head.next
            this.head.next = this.head.next.next;
            temp.next = null;
            // console.log("returning",temp)
            return temp.value
        }
        // this.resetIter()
        return null
    }
}



/***********************************************************
 * Timeout and animation
 ***********************************************************/

//Timeout
let timeoutID = window.setTimeout(()=>{keepDrawing=0}, timeout)
window.addEventListener('click',()=>{
    let old = keepDrawing
    keepDrawing = 1;
    window.clearTimeout(timeoutID)
    timeoutID = window.setTimeout(()=>{keepDrawing=0}, timeout)
    if(old==0) draw()
    // console.log(keepDrawing)
} )


// function translate(obj, x, y,time){
    
// }


function translate(obj, x, y, time) {
   
    let dx = Math.ceil((x*u)/time);
    let dy = Math.ceil((y*u)/time);

    console.log(x,y,u,time, dx,dy)
    
    if(obj.x<=DOCWIDTH)
        obj.x = obj.x + dx
    else{
        obj.x = 0
        obj.y = 0 
    }
    if(obj.y<=DOCHEIGHT)
        obj.y = obj.y + dy
    else{
        obj.x = 0
        obj.y = 0 
    }
    
    return true
}


/***********************************************************
 * Animation Queue
 ***********************************************************/
const animationQueue = new Queue()

const animationItem1 = {
    // callback: animation_1,
    time: 1500,
    animate: (time)=>{
        console.log("hello")
        translate(sq,200,220,time)
    },
    
}

animationQueue.append(animationItem1)
// animationQueue.append(animationItem2)
// animationQueue.append(animationItem1)
// animationQueue.append(animationItem2)


let animation = animationQueue.dequeue();

let time = Date.now()

let lastFrame = Date.now()

//Draw
function draw(){
    if(keepDrawing){
        ctx.clearRect(0,0,DOCWIDTH,DOCHEIGHT)
        ctx.fillStyle = 'tomato'
        ctx.fillRect(sq.x+ 30 , sq.y + 30, 2*u, 2*u)
        
        if(animation != undefined){
            //update
            let dt = Date.now() - time

            if(dt<=animation.time){
                animation.animate(animation.time)
            }
            else{
                console.log(sq.x, sq.y)
                animation = animationQueue.dequeue();
                time = Date.now()
            }

            window.requestAnimationFrame(draw)
        }
            
    }
}



init()