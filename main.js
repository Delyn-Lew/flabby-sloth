document.addEventListener('DOMContentLoaded', () => {
   const bear = document.querySelector('.bear')
   const gameDisplay = document.querySelector('.container-game')
   const ground = document.querySelector('.ground')
   const treeUp = document.querySelector('.treeUp')
   const treeDown = document.querySelector('.treeDown')

   let bearLeft = 50;
   let bearBottom = 300;
   let gravity = 2;
   let isGameOver = false;

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

let gameInterval = setInterval(startGame,10);

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
    let gap = ((Math.random() * 300) + 100);
    treeUp.style.height = gap + "px";
};

function gameOver() {
    clearInterval(gameInterval)
    isGameOver = true;
    document.removeEventListener("keyup", moveItwithSpace)
    treeUp.style.animationPlayState = "paused"
    treeDown.style.animationPlayState = "paused"
}

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
        bearBounding.y < treeDownBounding.y + treeDownBounding.height)
    ) {
      gameOver();
    }
}

})