var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = PIXI.autoDetectRenderer( WIDTH , HEIGHT , { backgroundColor: 0xffffff}); 
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var balls = [];
var players = [];
var worldX = 2500;
var worldY = 2500;
var pointRadius = 15;

stage.interactive = true;

var world = new PIXI.Container();
stage.addChild(world);

var texture = PIXI.Texture.fromImage('img/background.jpg');
var background = new PIXI.extras.TilingSprite(texture, 10000, 10000);
background.position.x = -5000;
background.position.y = -5000;

world.addChild(background);
generateBalls();

function generateBalls(){
    for( var i=0; i < 700; i++ ){
        var point = new Point( random(-worldX,worldX) , random(-worldY,worldY) , pointRadius );
        world.addChild(point.ball);
        balls.push(point);
    }
}

var player = new Player(window.innerWidth/2,window.innerHeight / 2);
world.addChild(player.ball);

function onKeyDown(event){

    switch(event.keyCode){
        case 37:
            player.move('x',-1);
            moveCamera( 'x' , 1 );
        break;
        case 38:
            player.move('y',-1);
            moveCamera( 'y' , 1 );
        break;
        case 39:
            player.move('x',1);
            moveCamera( 'x' , -1 );
        break;
        case 40:
            player.move('y',1);
            moveCamera( 'y' , -1 );
        break;
    }

}

function moveCamera( code , dir ){
    if( code == 'x' ){
        stage.position.x += player.ball.speed * dir;
    }
    if( code == 'y' ){
        stage.position.y += player.ball.speed * dir;
    }
}

function checkBalls(){
    
    for( var i=0; i < balls.length; i++ ){
        if( balls[i] ){
            if( player.collisionDetector(balls[i])){
                if( player.ball.radius > balls[i].ball.radius )
                {
                    player.score++;
                    player.ball.speed -= 0.02;
                    player.scaleBall();
                    balls[i].destroy();
                    balls.splice(i,1);
                }else if( player.ball.radius < balls[i].ball.radius ){
                    player.destroy();
                    document.removeEventListener('keydown',onKeyDown);
                }
            }
        }
    }

}

function checkPlayers(){
    
    for( var i=0; i < players.length; i++ ){
        if( players[i] ){
            if( player.collisionDetector(players[i]) && players[i] != player){
                if( player.ball.radius > players[i].ball.radius )
                {
                    player.score++;
                    player.ball.speed -= 0.02;
                    player.scaleBall();
                    players[i].destroy();
                    players.splice(i,1);
                }else if( player.ball.radius < players[i].ball.radius ){
                    player.destroy();
                    document.removeEventListener('keydown',onKeyDown);
                }
            }
        }
    }

}

function animate(){

    checkBalls();
    checkPlayers();

    requestAnimationFrame(animate);
    renderer.render(stage);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

animate();

document.addEventListener('keydown',onKeyDown);

setInterval(function(){
    var point = new Point( random(-worldX,worldX) , random(-worldY,worldY) , pointRadius );
    world.addChild(point.ball);
    balls.push(point);
    console.log(balls.length);
},5000);
