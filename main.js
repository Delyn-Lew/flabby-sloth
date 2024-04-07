document.addEventListener('DOMContentLoaded', () => {
  // cache elements 
  const bear = document.querySelector('.bear');
  const gameDisplay = document.querySelector('.container-game');
  const ground = document.querySelector('.ground');
  const treeUp = document.querySelector('.treeUp');
  const treeDown = document.querySelector('.treeDown');
  const startModal = document.getElementById('startPage');
  const startBtn = document.getElementById('startBtn');
  const gameEndModal = document.getElementById('gameEnd');
  const restartBtn = document.getElementById('restartBtn');

  // state variables
  let bearLeft = 50;
  let bearBottom = 400;
  let gravity = 2;
  let isGameOver = false;
  let isRunning = false;
  let score = 0;
  let gameInterval;
  
  // paused animation for upper tree and lower tree 
  treeUp.style.animationPlayState = "paused";
  treeDown.style.animationPlayState = "paused";

  startModal.style.display = "block";

  startBtn.addEventListener("click", function() {
    startModal.style.display = "none";
    isRunning = true;
    document.addEventListener("keyup", moveItwithSpace);
    gameInterval = setInterval(startGame, 10)
    // animation only starts when start button is clicked
    treeUp.style.animationPlayState = "running"; 
    treeDown.style.animationPlayState = "running";
    startGame();
    const highScore = localStorage.getItem("highScore");
    if (!highScore || score > highScore) {
      localStorage.setItem("highScore", score);
      updateHighScoreDisplay(score);
    }
  });

  restartBtn.addEventListener("click", function(){
    gameEndModal.style.display = "none";
    gameRestart();
    document.addEventListener("keyup", moveItwithSpace);

  })

  
  function startGame() {
    if (bearBottom > 0){
      bearBottom -= gravity;
      bear.style.bottom = bearBottom + "px";
      bear.style.left = bearLeft + "px";
      treeUp.style.animationPlayState = "running";
      treeDown.style.animationPlayState = "running";
      collisionDetector();
    }
    if (bearBottom <= 0) {
      gameOver();
    }
  }
  
  function gameRestart() {
    isGameOver = false;
    bearBottom = 350;
    window.location.reload();
  }
  
  function gameOver() {
    clearInterval(gameInterval)
    console.log("gameover")
    isGameOver = true;
    isRunning = false;
    document.removeEventListener("keyup", moveItwithSpace)
    treeUp.style.animationPlayState = "paused"
    treeDown.style.animationPlayState = "paused"
    gameEndModal.style.display = 'block';

    const highScore = localStorage.getItem("highScore");
    if(!highScore || score > highScore) {
      localStorage.setItem("highScore", score);
      updateHighScoreDisplay(score);
    } else {
      updateHighScoreDisplay(highScore);
    }
  }
  
  function moveItwithSpace(e) {
    if(e.keyCode === 32) {
      jump();
    }
  }
  function jump() {
    if(bearBottom < 500) bearBottom += 50;
    bear.style.bottom = bearBottom + "px";
    // console.log(bearBottom);
  }
  document.addEventListener("keyup",moveItwithSpace);
  

  treeUp.addEventListener("animationiteration", intoGap)
  
  function intoGap(){
    let gap = ((Math.random() * 200) + 100);
    treeUp.style.height = gap + "px";
    score++;
    updateScoreDisplay();
  };
  
  function collisionDetector(){
    const bearBounding = bear.getBoundingClientRect();
    const treeUpBounding = treeUp.getBoundingClientRect();
    const treeDownBounding = treeDown.getBoundingClientRect();
    if (
      (bearBounding.x < treeUpBounding.x + treeUpBounding.width &&
        bearBounding.x + bearBounding.width > treeUpBounding.x &&
        bearBounding.y < treeUpBounding.y + treeUpBounding.height &&
        bearBounding.y + bearBounding.height > treeUpBounding.y) ||
        (bearBounding.x < treeDownBounding.x + treeDownBounding.width &&
          bearBounding.x + bearBounding.width > treeDownBounding.x &&
          bearBounding.y + bearBounding.height > treeDownBounding.y &&
          bearBounding.y + bearBounding.height < treeDownBounding.y + treeDownBounding.height)
          ) {
            gameOver();
          }
        }
        
        function updateScoreDisplay() {
          const scoreDisplay = document.getElementById("score");
          scoreDisplay.textContent = `Score: ${score}`;
        }

        function updateHighScoreDisplay(highScore) {
          const highScoreDisplay = document.getElementById("highScore");
          highScoreDisplay.textContent = `High Score: ${highScore}`;
        }
      });