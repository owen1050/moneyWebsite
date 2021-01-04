class Graph {
  constructor() {
    this.xVals = [];
    this.yVals = [];
    this.x = 0;
    this.y = 0;
    this.xW = 0;
    this.yH = 0;
    this.border = 15;
    this.botGap = 55;
    this.sideGap = 80;
    this.drawLines = true;
    this.dotSize = 10;
    this.textSize = 18;
    
    this.xN = 4;
    this.yN = 4;
    this.xMin = 0;
    this.xMax = 10;
    this.yMin = 0;
    this.yMax = 10;
    
    this.xAxisLabel = "Age";
    this.yAxisLabel = "Stock + 401k in USD";
    
    this.originX = 0;
    this.originY = 0;
    this.topY = 0;
    this.rightX = 0;
    this.xGap = 0;
    this.xValGap = 0;
    this.yGap = 0;
    this.yValGap = 0;
    this.col = color(0,0,0);
  
  }

  display() {
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
      
    //draw outline of whole graph
    rect(this.x, this.y, this.xW, -this.yH);
    
    fill(color(0,0,0));
    
    this.updateDependencies();
    this.drawAxis();
    fill(this.col);
    this.drawDots();
    fill(color(255,255,255));
  }
  
  updateDependencies(){
    this.originX = this.x + this.border + this.sideGap;
    this.originY = this.y - this.border - this.botGap;
    
    this.topY = this.y - this.yH + this.border;
    this.rightX = this.x + this.xW - this.border;
    
    this.xGap = (this.rightX - this.originX) / (this.xN-1);
    this.xMin = min(this.xVals);
    this.xMax = max(this.xVals);
    this.xValGap = (this.xMax - this.xMin) / (this.xN - 1);
    
    this.yGap = (this.originY - this.topY) / (this.yN-1);
    this.yMin = min(this.yVals);
    this.yMax = max(this.yVals);
    this.yValGap = (this.yMax - this.yMin) / (this.yN - 1);
    
    let xCpy = [];
    xCpy = xCpy.concat(this.xVals);
    xCpy.sort();
    
    let yCpy = [];
    
    for(let i = 0; i < xCpy.length; i++){
      append(yCpy, this.yVals[this.xVals.indexOf(xCpy[i])]);
    }
    
    this.yVals = yCpy;
    this.xVals = xCpy;
  }
  
  drawDots(){
    // draw dots and lines
    let first = true;
    let pX = 0;
    let pY = 0;
    for(let i = 0; i < this.xVals.length; i++){
      let x = this.xValToXPos(this.xVals[i]);
      let y = this.yValToYPos(this.yVals[i]);
      circle(x, y, this.dotSize);
      
      if(first){
        first = false;
      }
      else{
        if(this.drawLines){
          line(pX, pY, x, y);
        }
      }
      pX = x;
      pY = y;
    } 
  }
  
  xValToXPos(xIn){
    let xScale = this.rightX - this.originX;
    let xValScale = this.xMax - this.xMin;
    let diff = xIn - this.xMin;
    let mult = diff / xValScale;
    let out = mult * xScale + this.originX;
    return out;
  }
  
  yValToYPos(yIn){
    let yScale = this.originY - this.topY;
    let yValScale = this.yMax - this.yMin;
    let diff = yIn - this.yMin;
    let mult = diff / yValScale;
    let out = this.originY - mult * yScale  ;
    return out;
  }
  
  drawAxis(){
    //yAxisLine
    line(this.originX, this.originY, this.originX, this.topY);
    //xAxisLine
    line(this.originX, this.originY, this.rightX, this.originY);
    
    //draw x axis
    for(let i = 0; i < this.xN; i++){
      let xPos = this.originX + this.xGap * i;
      line(xPos, this.originY, xPos, this.originY + 10);
      text(round(this.xMin + i * this.xValGap, 1), xPos, this.originY + this.textSize + 2);
    }
    
    text(this.xAxisLabel, (this.rightX + this.originX)/2, this.originY + this.textSize * 2 + 2);
    
    //Draw y axis
    for(let i = 0; i < this.yN; i++){
      let yPos = this.originY - this.yGap * i;
      line(this.originX, yPos, this.originX-10, yPos);
      text(round(this.yMin + i * this.yValGap, 0), this.originX - this.textSize - 28, yPos+1);
    }
    let yAxisXPos = this.x + this.textSize;
    translate(yAxisXPos, (this.originY + this.topY) / 2);
    rotate(-PI/2);
    text(this.yAxisLabel, 0, 0);
    rotate(PI/2);
    translate(-yAxisXPos, (this.originY + this.topY) / -2);
  }
  
}