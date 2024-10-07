var shotSound = new buzz.sound( "shot", {
    formats: ["ogg","mp3"]
});

var caixa = new Path.Rectangle(new Point(100,100),new Size(20,60));
caixa.strokeColor='blue';
caixa.strokeWidth=2;
caixa.fillColor = 'red';
caixa.rotation = 0;
caixa.data = {inercia: new Point(0,1)};

var test = new Point(0,1);
console.log({
    test: test,
    angle: test.angle,
    length: test.length,
    x: test.x,
    y: test.y,
});





//canhao = [0,10];
//canhao.length = 10;
canhao = {
    length: 20,
    path: new Path.Line([0,0],[0,0]),
    vec: function(){
        return this.path.segments[1].point - this.path.segments[0].point;
    },
    vecTo: function(point){
        vec = point - this.path.segments[0].point;
        vec.length = this.length;
        return vec;
    },
    setPosition: function(newposition){
        this.position = newposition;
        this.path.segments[0].point = newposition;
    },
    setTarget: function(target){
        this.path.segments[1].point = this.path.segments[0].point + this.vecTo(target);
    },
};

canhao.path.strokeColor = 'green';
canhao.path.strokeCap = 'round';
canhao.path.strokeWidth = 5;

running= true;

var x=0;
var gravidade = new Point(0,10);


var tiros = [];

var mousePos = [0,0]


// function onMouseMove(event){
//     mousePos = event.point;
// }


// function onMouseDown(event){
//     tiro = {
//         position: canhao.position,
//         power: 1000,
//         size: 3,
//         path: new Path.Circle(canhao.position,3),
//         inercia: canhao.vecTo(event.point) + caixa.data.inercia,
//         move: function(delta){
//             this.path.remove();
//             this.position = this.position + this.inercia;
//             this.power -= delta;
//             this.size = 3 * (this.power/1000);
//             this.path = new Path.Circle(this.position,this.size);
//             this.path.fillColor = 'black';
//         }
//     }
//     caixa.data.inercia += -tiro.inercia*0.05;
//     tiros.push(tiro);

//     var shotSound = new buzz.sound( "shot", {
//         formats: ["ogg","mp3"]
//     });
//     shotSound.play();

// }

function onFrame(event){
    if(!running) return;





    var rotationShift = 0;

    if(Key.isDown('d')) {

        rotationShift = 2;
        caixa.rotation += rotationShift;
        console.log(caixa.rotation);
    
    } else if(Key.isDown('a')) {
        rotationShift = -2;
        // console.log(caixa.rotation);
        caixa.rotation += rotationShift;
        console.log(caixa.getAngle());
    
    }
    
    // caixa.data.inercia.angle -= rotationShift;
    

    if(Key.isDown('w')) {
        // fy = -(20*event.delta) * Math.sin(caixa.data.angulo * Math.PI / 180)
    //     fx = (20*event.delta) * Math.cos(caixa.data.angulo * Math.PI / 180)
    //     console.log({
    //         1:20*event.delta,
    //         angulo: caixa.data.angulo,
    //         2:Math.cos(caixa.data.angulo * Math.PI / 180),
    //         fx: fx,
    //     })
        fy = -0.3;
        fx = 0;
        caixa.data.inercia += [fx,fy];
    }
    // console.log(caixa.data.inercia);

    // caixa.rotation -= rotationShift;
    
    caixa.data.inercia += gravidade * event.delta * 0.99;


    // caixa.rotate(CxRotation);
    // console.log(caixa.data.inercia);

    caixa.position += caixa.data.inercia*(60*event.delta);


    // //move o canhao
    // canhao.setPosition(caixa.position);
    // canhao.setTarget(mousePos);

    // // move as balas
    // for(i in tiros){
    //     tiros[i].move(event.delta*1000);
    //     if(tiros[i].power<=0) { tiros[i].path.remove(); tiros.splice(i, 1); }
    // }

    // //colisao chao e teto
    // console.log(caixa.position);
    // if(caixa.position.y<=0) {
    //     caixa.data.inercia.y = 0;
    //     caixa.position.y = 0;
    // }
    if(caixa.position.y>=view.size.height - caixa.bounds.height/2 ) {

        // console.log('colisao',view.size.height,caixa.bounds.height);
        caixa.data.inercia.y = 0;
        caixa.position.y = view.size.height - caixa.bounds.height/2;
        caixa.rotation = 0;
        caixa.rotate(caixa.data.inercia.angle);
    }


    // //colisao paredes
    // if(caixa.position.x<=0) { caixa.data.inercia.x = 0; caixa.position.x = 0; }
    // if(caixa.position.x>=view.size.width) { caixa.data.inercia.x = 0; caixa.position.x = view.size.width; }


}