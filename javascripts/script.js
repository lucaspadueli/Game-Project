const canvas = document.getElementById("canvas-project")
const ctx = canvas.getContext('2d');

const firstScreen = document.getElementById("first-screen");
const ctx3 = firstScreen.getContext("2d");

let gameStarted = false;
document.body.removeChild(canvas)


function startScreen () {
  ctx3.fillStyle = "blue";
  ctx3.fillRect(0, 0, 700, 650);

  // draw the button
  ctx3.fillStyle = "red";
  ctx3.fillRect(250, 300, 200, 100);
  ctx3.fillStyle = "white";
  ctx3.font = "30px Arial";
  ctx3.fillText("Start", 305, 360);

  // add a click event listener to the button
  firstScreen.addEventListener("click", (event) => {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    if (x >= 250 && x <= 450 && y >= 300 && y <= 400) {
      gameStarted = true;
      if(gameStarted == true){
      document.body.appendChild(canvas);
      firstScreen.style.display = "none";
      canvas.style.display = "block";
      updateCanvas();
      time = 0;
      document.addEventListener('keydown', e => {
        console.log(e);
        switch (e.keyCode) {
          case 38:
            hero.moveUp();
            break;
          case 40:
            hero.moveDown();
            break;
          case 37:
            hero.moveLeft();
            break;
          case 39:
            hero.moveRight();
            break;
            case 32:
              hero.slideRight();
              break;
              case 86:
                hero.slideLeft();
                break;
                
        }
        updateCanvas();
      })

    } }
  });
}

startScreen();

class Hero {
  constructor(){
    this.x = 120;
    this.y = 450;
    this.jumpTimeout = null;
    const img = new Image ();
    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
    })
    img.src = "/images/pixel-anime.png";
  }
  moveUp() {
  if (this.jumpTimeout) return;
  let jumpInterval = setInterval(() => {
    this.y -= 9;
    if (this.y <= 500 - 170) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(() => {
        this.y += 9;
        if (this.y >= 500 - 50) {
          clearInterval(fallInterval);
          this.jumpTimeout = setTimeout(() => {
            this.jumpTimeout = null;
          }, 300);
        }
      }, 10);
    }
  }, 5);
}
  moveDown() {
    if(this.y < 450){
      this.y += 25};
  }
  moveLeft() {
    if(this.x > 20){
    this.x -= 48};
  }
  moveRight() {
    if(this.x < 603){
    this.x += 48};
  }

  slideRight(){
    this.x += 170;
  }
  slideLeft(){
    this.x -= 170;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 70, 70);
    
  }
  

}

class Floor {
  constructor () {
   this.x = 0;
   this.y = 518;
   this.width = 700;
   this.height = 150;
   this.color = "green";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }

  update (){
  
  
}}


class DarkSadFace {
  constructor(x, y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    
  }
  
  draw(ctx) {
    ctx.fillStyle = "#2E2E2E";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y + 5, 3, 0, 2 * Math.PI);
    ctx.arc(this.x + 5, this.y + 5, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's pupils
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y + 5, 1, 0, 2 * Math.PI);
    ctx.arc(this.x + 5, this.y + 5, 1, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's mouth
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 8, 4, Math.PI, 2 * Math.PI, true);
    ctx.stroke();
  }
  update() {
    this.y += this.speed;
    if(time == 0){
      this.x = 50;
      this.y = 0;
    }
    else if (this.y > 650) {
      this.y = 0;
      let darkPositions = [120,160,240,300,360,400,480,550,620];
      for(let i = 0; i < darkPositions.length; i++){
        this.x = darkPositions[Math.floor(Math.random() * darkPositions.length)]
      }
    }
    
  }

}

// happy yellow face.

class HappyYellowFace {
  constructor (x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.collisionDetected = false;
    
  }

  draw (ctx) {
   
     
    
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y + 5, 3, 0, 2 * Math.PI);
    ctx.arc(this.x + 5, this.y + 5, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's pupils
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y + 5, 1, 0, 2 * Math.PI);
    ctx.arc(this.x + 5, this.y + 5, 1, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the character's mouth
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 8, 4, Math.PI, 2 * Math.PI, false);
    ctx.stroke();
   }
  update() {
    
    this.y += this.speed;
    if (this.y > 650) {
      this.y = 0;
      let positionsX = [50,100,140,200,240,290,350,400,450,480,500,530,570];
      for(let i = 0; i < positionsX.length; i++){
        this.x = positionsX[Math.floor(Math.random() * 13)]
      }
      this.collisionDetected = false;
      
    }
    else if(time == 0){
      this.y = 0 
    }
   
    
  }

}

class Flower {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.collisionDetected = false;
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    ctx.fill();
    for (let i = 0; i < 360; i += 45) {
      let x = this.x + Math.cos(i * Math.PI / 180) * 15;
      let y = this.y + Math.sin(i * Math.PI / 180) * 15;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    
  }

  update() {
    this.y -= this.speed;
    if (time == 0){
      this.y = 650;
      this.x = 350;
    }
    else if (this.y <= 0) {
      this.y = 650;
      this.x = Math.floor(Math.random() * 700)
    }
    this.collisionDetected = false;
  }
}


let darkSadFace = new DarkSadFace(400,0,5);
let happyYellowFace = new HappyYellowFace(Math.floor(Math.random() * 700),0,5);
const floor = new Floor();
const hero = new Hero();
let flower = new Flower (300, 650, 3);
let secondFace = new HappyYellowFace (Math.floor(Math.random() * 700),0);
let secondSadFace = new DarkSadFace (600,0, 5);

let intervalId = setInterval(() => {
  darkSadFace.update();
  happyYellowFace.update();
  flower.update();
  floor.update();
  secondFace.update(); 
  secondSadFace.update();
}, 16);






const sky = new Image();
sky.src = "/images/starPic.png";
sky.addEventListener("load", ()=> {
  updateCanvas();
})

let time = 0;

function timer (){
time += 1
console.log(`Time is ${time}`);
}
const timerInterval = setInterval(timer,1000);
timer()
  
function collision(hero, face) {
  if (hero.x < face.x + 60 &&
      hero.x + 60 > face.x &&
      hero.y < face.y + 60 &&
      hero.y + 60 > face.y && !face.collisionDetected) {
    face.collisionDetected = true;
    face.y = 700;
    return 5;
  } else {
    return 0;
  }
}

function secondCollision (hero,face){
  if (hero.x < face.x + 50 &&
    hero.x + 50 > face.x &&
    hero.y < face.y + 50 &&
    hero.y + 50 > face.y && !face.collisionDetected) {
  face.collisionDetected = true;
  face.y = 700;
  return 5;
} else {
  return 0;
}
}

function flowerCollision (hero, flower){
  if (hero.x < flower.x + 50 &&
    hero.x + 50 > flower.x &&
    hero.y < flower.y + 50 &&
    hero.y + 50 > flower.y && !flower.collisionDetected) {
  flower.collisionDetected = true;
  flower.y = 0;
  return -5;
} else {
  return 0;
}
}

function darkCollision (hero, face){
  if (hero.x < face.x + 10 &&
    hero.x + 10 > face.x &&
    hero.y < face.y + 10 &&
    hero.y + 10 > face.y && !face.collisionDetected) {
     return true;
  face.y = 700;
  
} }

function secondDarkCollision (hero, face){
  if (hero.x < face.x + 50 &&
    hero.x + 50 > face.x &&
    hero.y < face.y + 50 &&
    hero.y + 50 > face.y && !face.collisionDetected) {
     return true;
  face.y = 700;
  
} }
let gameOver = false;


function updateCanvas() {
  
 if(gameStarted == true){
  ctx.clearRect(0, 0, 700, 650)
  ctx.drawImage(sky, 0, 0, 700, 650);
  floor.draw();
  hero.draw();
  darkSadFace.draw(ctx);
  happyYellowFace.draw(ctx);
  flower.draw(ctx);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Time: ${time}`,10, 25);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  score += collision(hero,happyYellowFace);
  score += secondCollision(hero,secondFace);
  score += flowerCollision(hero,flower);
  if(darkCollision (hero,darkSadFace)){
    gameOver = true;
    canvas.style.display = "none";
    gameOverCanvas.style.display = "block";
    drawGameOver(score);
  } 
  
  
  ctx.fillText(`Score: ${score}`,600, 25);
  if(time > 25){
    secondFace.draw(ctx);
    secondSadFace.draw(ctx);
    happyYellowFace.speed = 7;
    darkSadFace.speed = 7;
    flower.speed = 5;
  }
  if(!gameOver){
    requestAnimationFrame(updateCanvas)
  }
  function drawGameOver(score) {
    ctx2.fillStyle = "black";
    ctx2.fillRect(0,0,700,650);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = "white";
    ctx2.fillText(`Game-Over! You scored ${score} points`, 100, 200);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = "white";
    ctx2.fillText(`Wanna try again?`, 200, 300);
  }
  
}}
let score = 0;
requestAnimationFrame(updateCanvas);


const gameOverCanvas = document.getElementById("game-over-canvas");
const ctx2 = gameOverCanvas.getContext("2d");




