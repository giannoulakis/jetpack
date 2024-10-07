/* setup */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* end setup */

/* assets */
        
image = new Image();
image.loaded = false;
image.spriteIndex = 0;
image.onload = () => { image.loaded = true; }
image.src = 'sprite.png';

// const shotSound = new buzz.sound( "shot", {
//     formats: ["ogg","mp3"]
// });

/* end assets */

/* objects */

const gravity = [0, 0.1];

const box = {
    point: [100, 100],
    size: [20, 60],
    color: 'red',
    strokeColor: 'blue',
    strokeWidth: 2,
    inercia: [0, 0],
    rotation: 0,
    angle: 90,
}

const cannon = {
    length: 20,
    point: [0, 0],
    target: [0, 0],
    strokeColor: 'green',
    strokeWidth: 5,
}

const shots = [];

/* end objects */

/* events */

let mousePos = [0, 0];

canvas.addEventListener('mousemove', (event) => {
    mousePos = [event.clientX, event.clientY];
});


/* end events */

/* game loop */

const running = true;
let lastTime = Date.now();

function onRender(delta) {
    if(!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // box
    ctx.save();
    ctx.translate(box.point[0], box.point[1]);
    ctx.rotate(box.rotation);
    ctx.fillStyle = box.color;
    ctx.strokeStyle = box.strokeColor;
    ctx.lineWidth = box.strokeWidth;
    ctx.fillRect(-box.size[0]/2, -box.size[1]/2, box.size[0], box.size[1]);
    ctx.strokeRect(-box.size[0]/2, -box.size[1]/2, box.size[0], box.size[1]);
    ctx.restore();





}

function tick() {
    const now = Date.now();
    const delta = now - lastTime;
    lastTime = now;
    onRender(delta);
    // window.requestAnimationFrame(tick);
    setTimeout(tick, 200);
}
tick();


/* end game loop */