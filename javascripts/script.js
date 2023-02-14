const canvas = document.getElementById("canvas-project")
const ctx = canvas.getContext('2d');

class Hero {
  constructor(){
    this.x = 505;
    this.y = 450;
    this.jumpTimeout = null;
    const img = new Image ();
    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
    })
    img.src = "/images/pixel-anime.png"
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
    this.x -= 48;
  }
  moveRight() {
    this.x += 48;
  }

  slideRight(){
    this.x += 170;
  }
  slideLeft(){
    this.x -= 170;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 85, 85);
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
    if (this.y > 650) {
      this.y = Math.floor(Math.random() * 150);
      this.x = Math.floor(Math.random() * 700)
    }
  }

}

// happy yellow face.

class HappyYellowFace {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
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
      this.y = Math.floor(Math.random() * 150);
      this.x = Math.floor(Math.random() * 700)
    }
  }

}

class Flower {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    if (this.y <= 0) {
      this.y = 650;
      this.x = Math.floor(Math.random() * 700)
    }
  }
}



let darkSadFace = new DarkSadFace(Math.floor(Math.random() * 150),Math.floor(Math.random() * 700), 5);
let happyYellowFace = new HappyYellowFace(Math.floor(Math.random() * 150),Math.floor(Math.random() * 700));
const floor = new Floor();
const hero = new Hero();
let flower = new Flower (300, 650, 3);
let secondFace = new HappyYellowFace (Math.floor(Math.random() * 150),Math.floor(Math.random() * 700));
let secondSadFace = new DarkSadFace (Math.floor(Math.random() * 150),Math.floor(Math.random() * 700), 5);

let intervalId = setInterval(() => {
  darkSadFace.update();
  happyYellowFace.update();
  flower.update();
  floor.update();
  secondFace.update(); 
  secondSadFace.update();
}, 16);


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


const sky = new Image();
sky.src = "/images/starPic.png";
sky.addEventListener("load", ()=> {
  updateCanvas();
})
  
let time = 0;
function timer (){
time += 1;
console.log(`Time is ${time}`);
}
const timerInterval = setInterval(timer,1000);




function updateCanvas() {
  
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
  if(time > 15){
    secondFace.draw(ctx);
    secondSadFace.draw(ctx);
  }
  if(darkSadFace.x === happyYellowFace.x){
    darkSadFace.x += 50
  }
  else if(darkSadFace.x === secondFace.x){
    darkSadFace.x += 50
  }
  else if(secondSadFace.x === happyYellowFace.x){
    secondSadFace.x += 50
  }
  else if(secondSadFace.x === secondFace.x){
    secondSadFace.x += 50
  }
  
  
  requestAnimationFrame(updateCanvas);
}

requestAnimationFrame(updateCanvas);







