document.addEventListener('DOMContentLoaded', () => {
   const bear = document.querySelector('.bear')
   const gameDisplay = document.querySelector('.container-game')
   const ground = document.querySelector('.ground')
   const treeUp = document.querySelector('.treeUp')
   const treeDown = document.querySelector('.treeDown')

   let bearLeft = 160;
   let bearBottom = 120;
   let gravity = 2;

   function startGame() {
    bearBottom -= gravity;
    bear.style.bottom = bearBottom + "px";
    bear.style.left = bearLeft + "px";
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
    console.log(bearBottom);
}
document.addEventListener("keyup",moveItwithSpace);

treeUp.addEventListener("animationiteration",()=>{
    let gap = ((Math.random() * 300) + 100);
    treeUp.style.height = gap + "px";
});
})