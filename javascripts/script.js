const canvas = document.getElementById("canvas-project");
const ctx = canvas.getContext("2d");

const firstScreen = document.getElementById("first-screen");
const ctx3 = firstScreen.getContext("2d");
const youWon = document.getElementById("you-won");
const ctx4 = youWon.getContext("2d");
let gameStarted = false;
let time = 0;
let gameOver = false;
let score = 0;
let intervalId = null;
startScreen();

function timer() {
  time += 1;
  console.log(`Time is ${time}`);
  if (time >= 60) {
    clearInterval(intervalId);
  }
}


function startScreen() {
    
    let startButton = new Image ();
    startButton.src = "https://www.pngall.com/wp-content/uploads/9/Start-Button-Vector-PNG-High-Quality-Image.png"

  startButton.addEventListener("load", () => {
    ctx3.drawImage(startButton,250,300,200,100)
  })
  
  ctx3.fillStyle = "purple";
  ctx3.fillRect (0,0,700,650);
  /*ctx3.fillStyle = "red";
  ctx3.fillRect (250,300,200,100);
  ctx3.font = "25px Arial";
  ctx3.fillStyle = "white";
  ctx3.fillText("START", 310,360);*/
  
  firstScreen.addEventListener("click", (event) => {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    if (x >= 250 && x <= 450 && y >= 300 && y <= 400) {
      gameStarted = true;
      
      document.body.appendChild(canvas);
      document.body.removeChild(firstScreen);
      document.body.removeChild(youWon);
      canvas.style.display = "block";
      
      
      document.body.removeChild(gameOverCanvas);
      document.addEventListener("keydown", (e) => {
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
        
      });
      requestAnimationFrame(updateCanvas);
      intervalId = setInterval(timer,1000);
    }
  });
}

class Hero {
  constructor() {
    this.x = 120;
    this.y = 450;
    this.jumpTimeout = null;
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });
    img.src =
      "https://www.avatarsinpixels.com/minipix/eyJXaW5ncyI6IjYiLCJIYWlyTG93ZXIiOiIzIiwiQ2FwZUJhY2siOiIxIiwiQm9keSI6IjIiLCJFeWVzIjoiMSIsIk1vdXRoIjoiMSIsIlNvY2tzIjoiMTMiLCJTaG9lcyI6IjMiLCJHbG92ZXMiOiIyIiwiUGFudHMiOiIxIiwiVG9wIjoiNiIsIkphY2tldCI6IjMiLCJDYXBlIjoiNSIsIkhhaXIiOiIyMyIsImV5ZXNUb25lIjoiZmI0ODM1IiwiZXllc1RvbmUyIjoiZGFjNjkwIiwibWFza1RvbmUiOiJiZDg5NGIiLCJoYWlyVG9uZSI6IjkyYTBjYyIsImhhaXJUb25lMiI6ImNmZTNkNCIsInVuZGVyd2VhclRvbmUiOiJmMjdiMjkiLCJ1bmRlcndlYXJUb25lMiI6ImFmNWZiNSIsInBhbnRzVG9uZSI6IjA2MjlmNyIsInBhbnRzVG9uZTIiOiJjNzcxZjciLCJ0b3BUb25lIjoiZDFmNjhhIiwidG9wVG9uZTIiOiJlYWJlYzQiLCJ3aW5nc1RvbmUiOiJlZDUzNmYiLCJ3aW5nc1RvbmUyIjoiNTYwYTE5Iiwic2hvZXNUb25lIjoiN2M2YTcwIiwic29ja3NUb25lIjoiYjg5ZjYyIiwic29ja3NUb25lMiI6IjhlZTU3YiIsImdsb3Zlc1RvbmUiOiJmZmE3YWIiLCJnbG92ZXNUb25lMiI6IjdhMGM0MCIsImhhdFRvbmUiOiJmZGRlYTMiLCJoYXRUb25lMiI6IjQyN2RjYSIsImNhcGVUb25lIjoiMjFkYTA2IiwiY2FwZVRvbmUyIjoiZjNiNTI0IiwiYmVsdFRvbmUiOiIwZmMyYzciLCJqYWNrZXRUb25lIjoiNjA1NDllIiwiamFja2V0VG9uZTIiOiJkMzlmZWYiLCJuZWNrVG9uZSI6ImJkYmVlZCIsIm5lY2tUb25lMiI6ImYxNzQ5NSJ9/1/show.png";
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
    if (this.y < 450) {
      this.y += 25;
    }
  }
  moveLeft() {
    if (this.x > 20) {
      this.x -= 48;
    }
  }
  moveRight() {
    if (this.x < 603) {
      this.x += 48;
    }
  }

  slideRight() {
    this.x += 170;
  }
  slideLeft() {
    this.x -= 170;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 70, 70);
  }
}

class Floor {
  constructor() {
    this.x = 0;
    this.y = 518;
    this.width = 700;
    this.height = 150;
    this.color = "green";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {}
}

class DarkSadFace {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
   
  }

  draw(ctx) {
    ctx.fillStyle = "gray";
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
    if (time == 0) {
      
      this.y = 0;
    } else if (this.y > 650) {
      this.y = 0;
      let darkPositions = [120, 160, 240, 300, 360, 400, 480, 550, 620];
      for (let i = 0; i < darkPositions.length; i++) {
        this.x =
          darkPositions[Math.floor(Math.random() * darkPositions.length)];
      }
    }
  }
}

// happy yellow face.

class HappyYellowFace {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.collisionDetected = false;
  }

  draw(ctx) {
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
      let positionsX = [
        50, 100, 140, 200, 240, 290, 350, 400, 450, 480, 500, 530, 570,
      ];
      for (let i = 0; i < positionsX.length; i++) {
        this.x = positionsX[Math.floor(Math.random() * 13)];
      }
      this.collisionDetected = false;
    } else if (time == 0) {
      this.y = 0;
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
      let x = this.x + Math.cos((i * Math.PI) / 180) * 15;
      let y = this.y + Math.sin((i * Math.PI) / 180) * 15;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

update() {
  this.y -= this.speed;
  if (time == 0) {
  this.y = 650;
  this.x = 350;
                 } 
    else if (this.y <= 0) {
      this.y = 650;
      this.x = Math.floor(Math.random() * 700);
                          }
    this.collisionDetected = false;
  }
}

let darkSadFace = new DarkSadFace(Math.floor(Math.random() * 700), 0);
let happyYellowFace = new HappyYellowFace(
Math.floor(Math.random() * 700),0,5);
const floor = new Floor();
const hero = new Hero();
let flower = new Flower(300, 650, 3);
let secondFace = new HappyYellowFace(Math.floor(Math.random() * 700), 0, 3);
let secondSadFace = new DarkSadFace (400, 0 );
let happyArray = [];

happyArray.push(new HappyYellowFace());




// const timerInterval = setInterval(timer, 1000);


function collision(hero, face) {
  if (
    hero.x < face.x + 60 &&
    hero.x + 60 > face.x &&
    hero.y < face.y + 60 &&
    hero.y + 60 > face.y &&
    !face.collisionDetected
  ) {
    face.collisionDetected = true;
    face.y = 700;
    return 5;
  } else {
    return 0;
  }
}



function flowerCollision(hero, flower) {
  if (
    hero.x < flower.x + 50 &&
    hero.x + 50 > flower.x &&
    hero.y < flower.y + 50 &&
    hero.y + 50 > flower.y &&
    !flower.collisionDetected
  ) {
    flower.collisionDetected = true;
    flower.y = 0;
    return -5;
  } else {
    return 0;
  }
}

function darkCollision(hero, face) {
  if (
    hero.x < face.x + 50 &&
    hero.x + 50 > face.x &&
    hero.y < face.y + 50 &&
    hero.y + 50 > face.y &&
    !face.collisionDetected
  ) {
    return true;
    face.y = 700;
  }
}




function updateCanvas() {
  darkSadFace.update();
  happyYellowFace.update();
  flower.update();
  floor.update();

  //secondFace.update();
  ctx.clearRect(0, 0, 700, 650);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 750, 650);
  floor.draw();
  hero.draw();
  darkSadFace.draw(ctx);
  happyYellowFace.draw(ctx);
  //secondFace.draw(ctx)
  flower.draw(ctx);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Time: ${time}`, 10, 25);
  
  score += collision(hero, happyYellowFace);
  score += collision(hero, secondFace);
  score += flowerCollision(hero, flower);
  
  if(time > 10){
    secondFace.update();
    secondFace.draw(ctx);
    secondSadFace.update()
    secondSadFace.draw(ctx);
  }
  
  
  if (darkCollision(hero, darkSadFace)) {
    gameOver = true;
    canvas.style.display = "none";
    gameOverCanvas.style.display = "block";
    drawGameOver(score);
  }
  else if(darkCollision(hero, secondSadFace)){
    gameOver = true;
    canvas.style.display = "none";
    gameOverCanvas.style.display = "block";
    drawGameOver(score);
  }
  ctx.fillText(`Score: ${score}`, 600, 25);
  if (time > 20 && time < 30) {
    happyYellowFace.speed = 6;
    darkSadFace.speed = 6;
    flower.speed = 5;
  } else if (time >= 30 && time < 40) {
    happyYellowFace.speed = 8;
    darkSadFace.speed =8;
  } else if (time > 40 && time < 50) {
    happyYellowFace.speed = 9;
    darkSadFace.speed = 9;
  } else if (time > 50) {
    happyYellowFace.speed = 11;
    darkSadFace.speed = 11;
  }

  if (!gameOver) {
    requestAnimationFrame(updateCanvas);
  } else if (gameOver) {
    document.body.appendChild(gameOverCanvas);
    document.body.removeChild(canvas)
    clearInterval(intervalId);
  }
  
  function drawYouWon(score) {
    ctx4.fillStyle = "black";
    ctx4.fillRect(0, 0, 700, 650);
    ctx4.font = "20px Arial";
    ctx4.fillStyle = "white";
    ctx4.fillText(
      `Congratulation! You won! You scored ${score} points`,
      100,
      150
    );

    ctx4.fillStyle = "white";
    ctx4.fillText(`Wanna play again?`, 230, 200);
    
    let yesButton = new Image ();
    yesButton.src = "/images/yes.png";
    
    yesButton.addEventListener("load", () => {
      ctx4.drawImage(yesButton, 280, 235, 100, 100);
    });

    youWon.addEventListener("click", (event)=> {
      const x = event.clientX - event.target.offsetLeft;
      const y = event.clientY - event.target.offsetTop;
  
      if (x >= 280 && x <= 380 && y >= 235 && y <= 335) {
        location.reload();
      }
    })

  }
  if (time >= 60 && score >= 100) {
    gameOver = true;
    canvas.style.display = "none";
    gameOverCanvas.style.display = "none";
    document.body.appendChild(youWon);
    drawYouWon(score);
  } else if (time >= 60 && score < 90) {
    gameOver = true;
    canvas.style.display = "none";
    gameOverCanvas.style.display = "block";
    drawGameOver(score);
  }
  function drawGameOver(score) {
    ctx2.fillStyle = "black";
    ctx2.fillRect(0, 0, 700, 650);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = "white";
    ctx2.fillText(`Game-Over! You scored ${score} points`, 100, 130);
    ctx2.font = "30px Arial";
    ctx2.fillStyle = "white";
    ctx2.fillText(`Wanna try again?`, 200, 200);
    
    let yesButton = new Image ();
    yesButton.src = "/images/yes.png";
    
    yesButton.addEventListener("load", () => {
      ctx2.drawImage(yesButton, 260, 250, 100, 100);
    });


 // add a click event listener to the button
 gameOverCanvas.addEventListener("click", (event) => {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  if (x >= 260 && x <= 360 && y >= 250 && y <= 450) {
    location.reload() }})
  
}
}



const gameOverCanvas = document.getElementById("game-over-canvas");
const ctx2 = gameOverCanvas.getContext("2d");
