var nave, naveImage
var bicho, bicho_multicolor
var estrella, estrellaImage, estrellasGroup
var END = 0
var PLAY = 1
var gameState = PLAY
var mukika
var score = 0
var tiro, tiroimg
var tirosgroup, bichosGroup //variables de grupos

function preload(){
naveImage = loadImage ("nave XD.jpg")
bicho_multicolor = loadAnimation ("pixil-frame-0.png","pixil-frame-1.png")
estrellaImage = loadImage ("estrella.png")
mukika = loadSound("MusicaEpica.mp3")
tiroimg = loadImage ("fuego.png")
}

function setup() {
createCanvas(windowWidth,windowHeight)
nave = createSprite (width/2,height-50)
nave.addImage(naveImage)
nave.scale = 0.05
nave.setCollider("circle")
nave.debug = false
mukika.loop() 

tirosgroup = new Group();// crear gruppo para tiros
bichosGroup = new Group();// crear gruppo para bichos
}

function draw() {
 background("black")
 
 if(gameState == PLAY){
     score = score + Math.round(getFrameRate() / 60) 
     tiros()
     movimiento()
     spawnEstrellas()
     spawnbichos()
     muertes()
 }else if (gameState == END){
    score = 0
    estrella.velocityY = 0
    bicho.velocityY = 0 
    text ("GAME OVER",width/2,height/2)
 }
 drawSprites()
 text ("Score:" + score, width/2, 50)
}

function movimiento (){
    if(keyIsDown(RIGHT_ARROW)){
        nave.x = nave.x + 10
    }
    if(keyIsDown(LEFT_ARROW)){
        nave.x = nave.x + -10
    }
    if(keyIsDown(UP_ARROW)){
        nave.y = nave.y + -10
    }
    if(keyIsDown(DOWN_ARROW)){
        nave.y = nave.y + 10
    }
}

function spawnEstrellas(){
 if (frameCount % 1 == 0){
    estrella = createSprite(width/2,0,50,50)
    estrella.addImage(estrellaImage)
    estrella.x = Math.round(random(0,width))
    estrella.velocityY = 7
    estrella.scale = 3
    //ciclo de vida 
    estrella.lifetime = 100
    // ajustar la profundidad 
    estrella.depth = nave.depth
    nave.depth = nave.depth +1
 }
}

function spawnbichos(){
    if (score % 40 == 0){
        bicho = createSprite(width/2,0,50,50)
        bicho.addAnimation("running",bicho_multicolor)
        bicho.x = Math.round(random(0,width))
        bicho.setCollider("rectangle")
        bicho.debug= true
        bicho.velocityY = 1.5
        bicho.scale = 3
        bicho.lifetime = 500

        bichosGroup.add(bicho);
    }
}

function tiros(){
    if  (keyDown("space")){
        tiro = createSprite (nave.x,nave.y,50,50)
        tiro.addImage (tiroimg)
        tirosgroup.add(tiro)//necesitamos agregar un grupo para que sepa el juego a que elemento toca
        tiro.velocityY = -25
        tiro.depth = nave.depth
        tiro.depth = tiro.depth+1
        tiro.scale = 3
        tiro.lifetime  = 50
        tiro.setCollider("rectangle",0,0,10,10)
        tiro.debug= true
    }
}

//error en "isTouching"
function muertes (){
    if (tirosgroup.isTouching(bichosGroup)){ //se asigna el isTouchin al grupo de tiros
        bichosGroup.destroyEach();//como es un grupo se destrulle de esta manera
        tirosgroup.destroyEach();//como es un grupo se destrulle de esta manera

    }
    if (bicho.isTouching(nave)){
        gameState = END
    }
}