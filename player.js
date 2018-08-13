class Player extends Ball{
    
    constructor(x,y)
    {
        super(x,y,30);
        this.score = 0;
        this.text = new PIXI.Text(this.score);
        this.text.anchor.set(0.5,0.5);
        this.text.x = 0 ;
        this.text.y = 0 ;
        this.grow = false;
        this.ball.addChild(this.text);
    }

    move(code,dir)
    {
        super.move(code,dir);
        this.drawText();
    }

    collisionDetector(b)
    {
        var ab = this.ball.getBounds();
        var bb = b.ball.getBounds();
        
        return  ab.x + ab.width > bb.x + bb.width / 2  && ab.x < bb.x + bb.width  && ab.y + ab.height > bb.y + bb.height / 2 && ab.y < bb.y + bb.height ;
    }

    redRaw()
    {
        var x = this.ball.position.x;
        var y = this.ball.position.y;
        var rad = this.ball.radius
        
        this.ball.drawCircle(x,y,rad);
    }
    
    drawText(){
        this.text.text = this.score;
    }
    
    scaleBall(){
        this.ball.scale.x +=0.02;
        this.ball.scale.y += 0.02;
    }
}