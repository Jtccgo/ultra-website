const {Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events} = Matter;
window.addEventListener('load', () => {
        const engine = Engine.create();//used to mess with stuff
    const world = engine.world//con

    engine.gravity.y = 1;//set it how you like
    const wallThickness = 100;
    const container = document.getElementById("physics-container");
    const width = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth
    );
    const height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight
    );
    container.style.width = width + "px";
    container.style.height = height + "px";
    //Renders
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,//using custom "textures"
            background: "transparent"
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    //creates boundaries so pogo can bounce

    const ground = Bodies.rectangle(width/2, height + wallThickness / 2, width, wallThickness, {isStatic: true});
    const ceiling = Bodies.rectangle(width/2, -wallThickness/2, width, wallThickness, {isStatic: true});
    const leftWall = Bodies.rectangle(-wallThickness/2, height/2, wallThickness, height, {isStatic: true});
    const rightWall = Bodies.rectangle(width + wallThickness/2, height/2, wallThickness, height, {isStatic: true});

    Composite.add(world, [ground, ceiling, leftWall, rightWall]);
    //Will eventually integrate with the actual dimensions of the image
    const imageWidth = 120;
    const imageHeight = 120;

    const pogo = Bodies.rectangle(width/2, 100, imageWidth, imageHeight, {
        restitution: 0.8, //Basically just bounciness from 0 to 1
        friction: 0.1,
        frictionAir: 0.01,//object sliiiiiiide
        render: {
            sprite : {
                texture: "sprites/button.png",//temporarily use a red circle
                xScale: imageWidth/120, //scale texture to actualy body
                yScale:imageHeight/120
            }
        }
    });

    Composite.add(world,pogo);

    //adss the mouse and throwing capabilities of the user
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse, 
        constraint: {
            stiffness: 0.2, //lower kind of keeps momentum and higher stops it I think?
            redner: {visible: false}
        }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;
    //switches the css of the matter canvas to auto when mouse clicks over pogo's position

    Events.on(mouseConstraint, 'enddrag', () => {
        render.canvas.style.pointerEvents = 'none';
    })

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        mouse.position.x = mouseX;
        mouse.position.y = mouseY;

        if(mouseConstraint.body) {
            render.canvas.style.pointerEvents = 'auto';
            return;
        }
        //checks the distance between cursor and pogo
        const dx = mouseX-pogo.position.x;
        const dy = mouseY - pogo.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);//omg the distance formula from algebra 1
        //the radius + the natural offset that matter has which is like roughly 15 or something i think?
        const hitRadius = (imageWidth/2) + 15;

        if(distance <= hitRadius) {
            render.canvas.style.pointerEvents = 'auto';
        } else {
            render.canvas.style.pointerEvents = 'none';
        }
    });
    //so pogo doesn't escape T_T
    Events.on(engine, 'beforeUpdate', () => {
        const pos = pogo.position;
        if(pos.x < -100 || pos.x > width + 100 || pos.y < -100 || pos.y > height + 100) {
            Matter.Body.setPosition(pogo, {x: width/2, y: 300});
            Matter.Body.setVelocity(pogo, {x: 0, y: 0});
            Matter.Body.setAngularVelocity(pogo, 0);
        }
    });
    //keeps proportions 
    window.addEventListener('resize', () => {
        render.canvas.width = width;
        render.canvas.height = height;
        //repositions the boundaries only need to do two
        Matter.Body.setPosition(ground, {x: window.innerWidth/2, y: window.innerHeight + wallThickness / 2});
        Matter.Body.setPosition(rightWall, {x: window.innerWidth + wallThickness / 2, y: window.innerHeight / 2});
    });
});