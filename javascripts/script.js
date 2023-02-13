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
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
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
   this.color = "purple";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}

class DarkSadFace {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 4;
    
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
    ctx.strokeStyle = "black";
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


let darkSadFace = new DarkSadFace(100, 0);
const floor = new Floor();
const hero = new Hero();

let intervalId = setInterval(() => {
  darkSadFace.update();
  
  if (darkSadFace.y > 650) {
    clearInterval(intervalId);
  }
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
  }
  updateCanvas();
})


 
  

function updateCanvas() {
  ctx.clearRect(0, 0, 700, 650)
  
  floor.draw();
  hero.draw();
  darkSadFace.draw(ctx);
  
  requestAnimationFrame(updateCanvas);
}

requestAnimationFrame(updateCanvas);







