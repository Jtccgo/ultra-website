/*const {Engine, Render, Runner, Bodies, Composite, ouse, MouseConstraint, Events} = Matter;

const engine = Engine.create();//used to mess with stuff
const world = engine.world//con

engine.gravity.y = 1;//set it how you like
//Renders
const container = document.getElementById("physics-container");
const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframe: false,//using custom "textures"
        background: "#1a1a1a"
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
//creates boundaries so pogo can bounce
const wallThickness = 100;
const width = window.innerWidth;
const height = window.innerHeight;

const ground = Bodies.rectangle(width/2, height + wallThickness / 2, width, wallThickness, {isStatic: true});
const ceiling = Bodies.rectangle(width/2, -wallThickness/2, width, wallThicknessm, {isStatic: true});
const leftWall = Bodies.rectangle(-wallThickness/2, height/2, wallThickness, height, {isStatic: true});
const rightWall = Bodies.rectangle(width + wallThickness/2, height/2, wallThickness, height, {isStatic: true});

Composite.add(world, [ground, ceiling, leftWall, rightWall]);
//Will eventually integrate with the actual dimensions of the image
const imageWidth = 120;
const imageHeight = 120;

const interactiveBody = Bodies.rectangle(width/2, 100, imageWidth, imageHeight, {
    restitution: 0.8, //Basically just bounciness from 0 to 1
    friction: 0.1,
    frictionAir: 0.01,
    render: {
        sprite : {
            texture: "sprites/button.png",//temporarily use a red circle
            xScale: imageWidth/120, //scale texture to actualy body
            yScale:imageHeight/120
        }
    }
});

Composite.add(world,interactiveBody);*/