n = 10;
let xG = [];
let yG = [];
let g;
let inp;

let fieldCount = 15;
let fields = [];
let fieldsName = ["Yearly Income(Post tax)",       //0
                 "Year Income Increase",
                 "Yearly Stock",
                 "Yearly Stock Increase",  ///3
                 "401k Emp Contribution",  
                 "401k Match Percent",
                 "Yearly ROR",  //6
                 "Staring Stock",
                 "Staring 401k",
                 "Starting savings", //9
                 "Monthly Expenses",
                 "Current Age",
                 "Work until",
                 "Live until",
                 "Retirement Salary"];//13
let defVals = [90000,
              1,
              18000,
              1,
              0.04,
              0.02,
              1.05,
              0,
              0,
              0,
              3000,
              22,
              65,
              95,
              180000]

let fieldVals = [];

function setup() {
  createCanvas(1200, 800);
  background(200,200,200);
  frameRate(20);
  
  g = new Graph();
  g.xVals = xG;
  g.yVals = yG;
  g.xW = 880;
  g.yH = 760;
  g.x = 300;
  g.y = 780;
  g.xN = 10;
  
  textAlign(LEFT, TOP);
  textSize(18);
  
  for(let i = 0; i < fieldCount; i++){
    inp = createInput(String(defVals[i]));
    inp.input(textInputEvent);
    inp.position(10, 10 + 26 * i);
    inp.size(80,18);
    text(fieldsName[i], 100, 14 + 26 * i);
    append(fields, inp);
    append(fieldVals, 0)
  }
  updateVars()
  
}

function textInputEvent(){
  //nothing yet, will take all input values
  //and turn them into g.xVals
  updateVars();
}

function updateVars(){
   for(let i = 0; i < fieldCount; i++){
     let t = float(fields[i].value());
     fieldVals[i] = t;
   }
  
   let ts = fieldVals[7];
   let ys = fieldVals[2];
   let income = fieldVals[0]
   let fonkTotal = fieldVals[8];
   let fonkYear = 0;
   let savings = fieldVals[9];
   let tx = [];
   let ty = [];
  let ty2 = [];
   for(let i = fieldVals[11]; i < fieldVals[12]; i++){
     ts = ts + ys;
     ys = ys * fieldVals[3];
     ts = ts * fieldVals[6];
     
     fonkTotal = fonkTotal * fieldVals[6];
     fonkYear = income * (fieldVals[4] + fieldVals[5]);
     fonkTotal = fonkYear + fonkTotal;
     income = income * fieldVals[1];
     
     savings = savings * fieldVals[6] + (income - fieldVals[10]*12 - fonkYear);
     
     append(tx, i);
     append(ty, ts + fonkTotal);
     append(ty2, savings);
   }
   
  let totalSavingsAtRet = ts + fonkTotal;
  for(let i = fieldVals[12]; i <= fieldVals[13]; i++){
     totalSavingsAtRet = totalSavingsAtRet - fieldVals[14];
     totalSavingsAtRet = totalSavingsAtRet * fieldVals[6];
     append(tx, i);
     append(ty, totalSavingsAtRet);
   }
  g.xVals = tx;
  g.yVals = ty;
  g.col = color(255,0,0);
  g.display();  
  
}

function draw() {
  //g.display();
  
}







