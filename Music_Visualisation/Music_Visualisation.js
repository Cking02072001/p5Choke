let myFont;
let soundFile;
let state = "pause";
let fft;
let spectrum, waveform, peakDetect, amplitude, peak;
let peakEllipseW, level;
let text0, text1, text2, text3;

function preload () {
  soundFile=loadSound ("./data/Choke-IDKHOW.mp3");
  myFont=loadFont ("./assets/HelveticaNowText-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background (0, 25, 47);
  frameRate(24);
  text0 ="Choke";
  text1 ="yourself";
  text2 ="to";
  text3 ="sleep";

  fft = new p5.FFT();
  fft.setInput(soundFile);
  peakDetect= new p5.PeakDetect(20, 1000, 0.35, 10);
  peak= new p5.PeakDetect(20, 1000, 0.35, 50);
  amplitude = new p5.Amplitude();
  amplitude.setInput (soundFile);
}


function draw() {
  resizeCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);



  let s=soundFile.currentTime()
    if (state =="pause")
  {
    title();
  }
  if (state=="play")
  {

    background (0, 25, 47);
    spectrum = fft.analyze();
    push();
    noLoop();

    if (s>0&&s<195.9) {
      idle();
    } else {
      theend();
    }
    pop();

    loop();
    waveform = fft.waveform(512);
    //Punkte
    if (s>58&&s<72||s>98&&s<114) {
      point1();
    }
    if (s>42&&s<58) {
      point2();
    }

    if (s>26&&s<40.1||(s>58.5&&s<72)||(s>98&&s<114)||s>186.3&&s<195.9) {
      point3();
    }

    if (s>10&&s<26||(s>58&&s<72)||(s>98&&s<114)||s>177.9&&s<195.9) {
      point4();
    }


    if ((s>58&&s<72)|| s>74.05 && s<77.4 || s>77.5 && s<80 || (s>98&&s<114)) {
      point5();
    }

    //silver points vertikal

    if (s>1.9&&s<10||(s>80&&s<82)|| s>82.3 && s<82.6 || s>83.3 && s<83.6 || s>136.5 && s<145.6) {
      vertpoint();
    }

    //vertikale rote Punkte

    if (s>130 && s<136.5) {
      redpoint();
    }

    //Textfelder
    //choke
    if (s>127.8&&s<128.3) {
      textc();
    }
    //yourself
    if (s>128.3&&s<129) {
      texty();
    }
    //to
    if (s>129&&s<129.5) {
      textt();
    }
    //sleep
    if (s>129.5&&s<130.2) {
      texts();
    }
    //rote Punkte horizontal

    if (s>23.8&&s<24.7||s>25&&s<25.8 ||s>21.8&&s<23||s>114&&s<128) {
      redpoints();
    }
    if (s>84 && s<86.5||s>87.5 && s< 94.6) {
      pointsup();
    }
    //Rote/r Kreis/e
    if (s>145.6&&s<177) {
      redcirc1();
    }


    if (s>40.2&&s<41 || s>41.2&& s<42 || s>74.05 && s<77.4 || s>77.5 && s<80) {
      redcirc2();
    }


    //white/leicht transp. Kreis

    if (s>114&&s<128.1) {
      whicir();
    }

    /* Timestamps helper
     
     let txtss = s;
     push();
     fill(255);
     textSize(20);
     text(txtss, width/2, height/1.1)
     pop(); */


    //Ellipsen

    //rote Ellipse
    if (s>0) {
      relips1();
    }

    //pulsierende O links


    if (s>26 &&s<39||s>72.5&&s<74||s>161.5&&s<177) {
      olinks();
    }

    //zweites pulsierende O rechts oben

    if (s>9.1&&s<26||s>72&&s<74||s>161.3&&s<177) {
      orechob();
    }


    //dritte pulsierende O rechts unten

    if (s>14.2&&s<40||s>73&&s<74||s>86&&s<97) {
      orechun();
    }
    //vierte pulsierende O links unten

    if (s>17.8 && s<23 ||s>34&&s<40||s>82&&s<97) {
      olinksun();
    }


    //fünfte pulsierende O mitte

    if (s>8.6&&s<9.9 || s>0.3&&s<2.5 || (s>138&&s<139||s>141&&s<142)||(s>142.2&&s<143)||(s>177.5&&s<188)||(s>189&&s<190)||(s>191&&s<192)) {
      Omid();
    }

    //runde Waveformen
    if (s>42 && s<74||s>86.5&&s<87.5||s>94.6&&s<98 || s>145.6&&s<177.5) {
      wave();
    }
  }
}

function mouseClicked () {
  if (soundFile.isPlaying ())
  {
    state = "pause";
    soundFile.pause();
  } else
  {
    state = "play";
    soundFile.play();
    //soundFile.jump (0);
    //end 195
  }
}

function keyPressed() {
  if (key =='s'|| key == 'S') {
    save("choke"+frameCount);
  }
}

function idle() {
}

function title() {
  background (0, 25, 47);
  textAlign(CENTER);
  noStroke();
  textFont(myFont);
  textSize (69);
  fill (255, 0, 0);
  text ("Click to play", width/2, height/1.4);
  textSize (69);
  fill (255);
  text ("Click to play", width/2, (height/1.4)-3);
  fill(255);
  textSize(20);
  text ("by IDKHOW", (width/2)+200, (height/2)+100);
  textSize(42);
  text ("CK presents", width/2, (height/2)-150);
  textSize(150);
  text ("CHOKE", (width/2)-10, (height/2)+55);
  fill(255, 0, 0);
  textSize(150);
  text ("CHOKE", (width/2)-10, (height/2)+50);
}

function point1() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height);
    stroke(0, 20, 40, 150);
    strokeWeight(10);
    point(x, y);
  }
  endShape();
}

function point2() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height+1500);
    stroke(180, 150);
    strokeWeight(20);
    point(x, y);
  }
  endShape();
}
function point3() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height);
    stroke(255, 150);
    strokeWeight(10);
    point(x, y);
  }
  endShape();
}

function point4() {

  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height+100);
    stroke(255, 20, 40, 50);
    strokeWeight(10);
    point(x, y);
  }
  endShape();
}

function point5() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height-100);
    stroke(255, 50);
    strokeWeight(10);
    point(x, y);
  }
  endShape();
}
function vertpoint() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let y = map (i, 0, waveform.length, 0, height);
    let x = map (waveform [i], -1, 1, 0, width - 100);
    stroke(255, 50);
    strokeWeight(10);
    point(x, y);
  }
  endShape();
}
function redpoint() {
  beginShape();
  stroke(255, 0, 0, 50);
  strokeWeight(10);
  for (let i=0; i <waveform.length; i++)
  {
    let y = map (i, 0, waveform.length, 0, height);
    let x = map (waveform [i], -1, 1, 0, width - 1000);
    point(x, y);
  }
  for (let i=0; i <waveform.length; i++)
  {
    let y = map (i, 0, waveform.length, 0, height);
    let x = map (waveform [i], -1, 1, 0, width + 1000);
    point(x, y);
  }
  endShape();
}
function redpoints() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height+50);
    fill(255, 0, 0, 150);
    stroke(255, 0, 0);
    strokeWeight(1);
    circle(x, y, 18);
  }
  endShape();
}
function pointsup() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height/4);
    fill(255, 40);
    stroke(255, 40);
    strokeWeight(1);
    circle(x, y, 5);
  }
  endShape();
}
function redcirc1() {

  beginShape();
  for (let i=0; i <waveform.length; i++)
  {

    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height+1000);
    fill(255, 0, 0, 60)
      stroke(255, 0, 0, 60);
    circle(x, y, 18);
  }
  endShape();
}
function redcirc2() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height+900);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(1);
    circle(x, y, 18);
  }
  endShape();
}
function whicir() {
  beginShape();
  for (let i=0; i <waveform.length; i++)
  {
    let x = map (i, 0, waveform.length, 0, width);
    let y = map (waveform [i], -1, 1, 0, height-100);
    fill(255, 15);
    stroke(255, 20);
    strokeWeight(1);
    circle(x, y, 18);
  }
  endShape();
}

function textc() {
  let vol = amplitude.getLevel();
  push();
  stroke(255, 0, 0, 20)
    textSize (100);
  fill (255, 25);
  for (let i = 0; i<=5; i++)
  {
    text (text0, random(width), random(height));
  }
  pop();
}

function texty() {
  let vol = amplitude.getLevel();
  push();
  stroke(255, 0, 0, 20)
    textSize (100);
  fill (255, 25);
  for (let i = 0; i<=10; i++)
  {
    text (text1, random(width), random(height));
  }
  pop();
}

function textt() {
  let vol = amplitude.getLevel();
  push();
  stroke(255, 0, 0, 20)
    textSize (100);
  fill (255, 25);
  for (let i = 0; i<=50; i++)
  {
    text (text2, random(width), random(height));
  }
  pop();
}

function texts() {
  let vol = amplitude.getLevel();
  push();
  stroke(255, 0, 0, 20)
    textSize (100);
  fill (255, 25);
  for (let i = 0; i<=100; i++)
  {
    text (text3, random(width), random(height));
  }
  pop();
}

function wave() {
  push();
  translate (width/2, 0);
  fill(255);
  strokeWeight(10);
  stroke(255, 0, 0);
  beginShape();

  for (let i=0; i <=180; i++)
  {
    let index = floor(map(i, 0, 340, 0, waveform.length-1));
    let r= map(waveform[index], -1, 1, 350, 750);
    let x = r*sin(i);
    let y = 1/2*r*cos (i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (let i=0; i <=180; i++)
  {
    let index = floor(map(i, 0, 180, 0, waveform.length-1));
    let r= map(waveform[index], -1, 1, 350, 750);
    let x = r*-sin(i);
    let y = 1/2*r*cos (i);
    vertex(x, y);
  }
  endShape();
  pop();
}

function relips1() {
  push();
  noFill();
  strokeWeight(20);
  stroke(255, 0, 0);

  let vol = amplitude.getLevel();
  ellipse(width/2, height/2, vol*350, vol*400);
  pop();
}
function olinks() {
  peakDetect.update(fft);
  if (peakDetect.isDetected)
  {
    peakEllipseW=120;
  } else
  {
    peakEllipseW *=0.9;
  }
  push();
  noFill();
  stroke(255, 0, 0);
  strokeWeight(6);
  ellipse (width/6.5, 2*height/5, peakEllipseW, peakEllipseW*1.2);
  pop();
}

function orechob() {
  peak.update(fft);
  if (peak.isDetected)
  {
    peakEllipseW=75;
  } else
  {
    peakEllipseW *=1.1;
  }
  push();
  noFill();
  stroke(255, 0, 0);
  strokeWeight(25);
  ellipse (width/1.17, height/2.5, peakEllipseW, peakEllipseW*2);
  pop();
}

function orechun() {
  let vol = amplitude.getLevel();
  noFill();
  strokeWeight(8);
  stroke(255, 0, 0);
  ellipse(5*width/7, height/1.2, vol*250, vol*250);
}
function olinksun() {

  let vol = amplitude.getLevel();
  noFill();
  strokeWeight(30);
  stroke(255, 0, 0);
  ellipse(width/5.5, height/1.25, vol*360, vol*630);
}

function Omid() {
  let vol = amplitude.getLevel();
  strokeWeight(25);
  stroke(255, 0, 0);
  noFill();
  ellipse(width/2, height/2, vol*2300, vol*2300);
}

function theend() {
  noStroke();
  fill (255, 0, 0);
  text ("CHOKE", (width/2)-10, (height/2)+50);
  fill(255);
  textSize(69);
  text("Click to restart", (width/2)-10, (height/2)+200);
}

function idle() {
  noStroke();
  textAlign(CENTER);
  textSize (150);
  textFont(myFont);
  fill (255);
  text ("CH   KE", (width/2)-10, (height/2)+50);
}
