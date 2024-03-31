//* constant
const bear = document.getElementById("bear");
const treeUp = document.getElementById("treeUp");
const treeDown = document.getElementById("treeDown");

//* variables
let gravity = 9;

//* functions
function bearThruHole() {
    let gap = ((Math.random() * 200) + 300);
    treeUp.style.height = gap + "px";
}
//* event listeners

treeUp.addEventListener("animationiteration", bearThruHole);