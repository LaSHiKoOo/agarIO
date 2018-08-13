class Ball{

    constructor(x,y,rad)
    {
        this.ball = new PIXI.Sprite();

        this.Graphics = new PIXI.Graphics();  
        this.Graphics.beginFill( Ball.colors[Math.floor( Math.random() * Ball.colors.length ) ]);
        this.Graphics.drawCircle(0,0,rad);
        this.Graphics.endFill();

        this.ball.radius = rad;
        this.ball.speed = 5;
        this.destroyed = false;
        this.ball.addChild(this.Graphics);
        
        this.ball.anchor.set(.5,.5);
        this.ball.x = x;
        this.ball.y = y;
    }

    static get colors(){
        return [
            0x00b300,
            0x3333ff,
            0xff751a,
            0xb3b300,
            0xff4d4d,
        ]
    }

    move(code,dir){
        if( code == 'x' ){
            this.ball.position.x += this.ball.speed * dir;
        }
        if( code == 'y' ){
            this.ball.position.y += this.ball.speed * dir;
        }
    }

    destroy(){
        world.removeChild(this.ball);
        this.destroyed = true;
    }
}