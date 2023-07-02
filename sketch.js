var red, redImg
var apple, appleImg
var mountain, mountainImg
var wolf, wolfImg
var ground, groundImg
var log, logImg
var rock, rockImg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var inground
var OBgroup
var redpic
var gameover, gameoverImg
var score
var sound , jsound , dsound

function preload() {
    appleImg = loadImage("apple.png")
    redImg = loadAnimation("red.gif")
    mountainImg = loadImage("mountain.jpg")
    wolfImg = loadImage("wolf.gif")
    wolfpic = loadAnimation("wolf.png")
    logImg = loadImage("newlog.png")
    groundImg = loadImage("groundlong.png")
    rockImg = loadImage("rock.png")
    redpic = loadAnimation("red.png")
    gameoverImg = loadImage("gameover.png")
    jsound = loadSound("jump.mp3")
    dsound = loadSound("GM.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    mountain = createSprite(windowWidth / 2, windowHeight / 2)
    mountain.addImage(mountainImg)
    mountain.scale = 0.65
   

    ground = createSprite(1100, windowHeight - 40, 1000, 50)
    ground.addImage(groundImg);
    ground.scale = 0.3
    ground.velocityX = -6

    wolf = createSprite(150, windowHeight - 135)
    wolf.addAnimation("running", wolfImg)
    wolf.addAnimation("collide", wolfpic)
    wolf.scale = 0.4
    wolf.setCollider("circle", 0, 0, 130);

    red = createSprite(450, windowHeight - 140, 100, 100)
    red.addAnimation("running", redImg)
    red.addAnimation("collide", redpic)
    red.scale = 0.6
    red.setCollider("circle", 0, 0, 100);

    inground = createSprite(windowWidth / 2, windowHeight - 62, windowWidth, 50)
    inground.visible = false

    OBgroup = createGroup()
    gameover = createSprite(windowWidth / 2, windowHeight / 2);
    gameover.addImage(gameoverImg);
    gameover.scale = 1
    
    score = 0   
    textSize(30)
}

function spawnOb() {
    var rand = Math.round(random(1, 4));
    var spawnTime = 0;


    switch (rand) {
        case 1: spawnTime = 150;
            break;
        case 2: spawnTime = 200;
            break;
        case 3: spawnTime = 250;
            break;
        case 4: spawnTime = 300;
            break;
        default: break;
    }
    if (frameCount % spawnTime === 0) {
        var log = createSprite(windowWidth, windowHeight - 100);
        log.addImage(logImg)
        log.scale = 0.3
        log.velocityX = -6
        log.lifetime = 300
        OBgroup.add(log)


    }


}


function draw() {
    background(45)





    if (gameState === PLAY) {
        gameover.visible = false
        if (ground.x < 118) {
            ground.x = 1100;
        }

        if (keyDown("space") && red.y >= 450) {
            red.velocityY = -13;
            jsound.play()
        }
        red.velocityY = red.velocityY + 0.8
        wolf.velocityY = wolf.velocityY + 0.8
        spawnOb()

        if (OBgroup.isTouching(red)) {
            gameState = END;
            dsound.play()
            
        }
        if (OBgroup.isTouching(wolf)) {
            wolf.velocityY = -12
            
        }
        score = score + 1;

    }
    else if (gameState === END) {
        gameover.visible = true
        ground.velocityX = 0;
        red.velocityY = 0
        red.changeAnimation("collide", redpic)
        wolf.velocityY = 0
        wolf.changeAnimation("collide", wolfpic)
        OBgroup.setLifetimeEach(-1)
        OBgroup.setVelocityXEach(0);
        if (keyDown("space")) {
            OBgroup.setVisibleEach(false)
            OBgroup.clear()
            gameState = PLAY
            wolf.changeAnimation("running", wolfImg)
            red.changeAnimation("running", redImg)
            ground.velocityX = -6
            score = 0
            
        }
    }
    red.collide(inground);
    wolf.collide(inground);
    drawSprites()
    text("Score: " + score,windowWidth-200,50);

}