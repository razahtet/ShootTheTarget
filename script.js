var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");
var target = document.getElementById("target");
var playArea = document.getElementById("playArea");
var shooter = document.getElementById("shooter");
var points = document.getElementById("points");
var hit = document.getElementById("hit");
document.addEventListener("mousemove", getMouse);
document.addEventListener("click", shootRocket);
easy.addEventListener("click", easyMode);
medium.addEventListener("click", mediumMode);
hard.addEventListener("click", hardMode);
var opposite = 0;
var adjacent = 0;
var point = 0;
var targets = 0;
var hits = 0;
var canShootAgain = true;
var speed = 25;
var randoming = 0;
var targetInterval = null;
var buttonPressed = false;
hit.innerHTML = "Targets: " + hits + "/" + targets;
changeTarget();

function easyMode() {
    speed = 25;
    buttonPressed = true;
}

function mediumMode() {
    speed = 16.67;
    buttonPressed = true;
}

function hardMode() {
    speed = 8.33;
    buttonPressed = true;
}

function changeTarget() {
    var randomx = Math.random() * 1175 + 25;
    var randomy = Math.random() * 500;
    target.style.top = randomy + "px";
    target.style.left = randomx + "px";
    targets = targets + 1;
    hit.innerHTML = "Targets: " + hits + "/" + targets;
    targetInterval = setInterval(moveTarget, 500);
}

function moveTarget() {
    var moveRandom = Math.floor(Math.random() * 50) - 25;
    if (randoming == 0 && target.offsetTop > -10 && target.offsetTop < 500) {
        target.style.top = target.offsetTop + moveRandom + "px";
        randoming = 1;
    }
    else if (randoming == 1 && target.offsetLeft > -10 && target.offsetLeft < 1200) {
        target.style.left = target.offsetLeft + moveRandom + "px";
        randoming = 0;
    }
}

function shootRocket() {
    if (canShootAgain == true && buttonPressed == false) {
        canShootAgain = false;
        setTimeout(original, 250);
        var angle = Math.atan2(opposite, adjacent);
        var cos = Math.cos(angle);
        var sine = Math.sin(angle);
        var rocket = document.createElement("img");
        rocket.src = "rocket.png";
        rocket.classList.add("rocket");
        playArea.appendChild(rocket);
        rocket.xvelocity = cos * speed;
        rocket.yvelocity = sine * speed;
        rocket.gravity = 0.025 * rocket.yvelocity;
        console.log(rocket.gravity);
        rocket.style.top = shooter.offsetTop + "px";
        rocket.style.left = shooter.offsetLeft + "px";
        rocket.style.transform = "rotate(" + angle + "rad)";
        rocket.topInterval = setInterval(go, 50, rocket, angle);
    }
    buttonPressed = false;
}

function original() {
    canShootAgain = true;
}

function go(object, angle) {
    console.log(object.offsetLeft);
    console.log(object.offsetTop);
    if (object.offsetLeft > 1200 || object.offsetTop >= 480 || object.offsetLeft <= -10) {
        clearInterval(object.topInterval);
        playArea.removeChild(object);
        targets = targets + 1;
        hit.innerHTML = "Targets: " + hits + "/" + targets;
    }
    else if (touching(object, target)) {
        clearInterval(object.topInterval);
        clearInterval(targetInterval);
        playArea.removeChild(object);
        point = point + 1;
        hits = hits + 1;
        hit.innerHTML = "Targets: " + hits + "/" + targets;
        points.innerHTML = "Points: " + point;
        changeTarget();
    }
    else {
        object.style.top = object.offsetTop + object.yvelocity + "px";
        object.style.left = object.offsetLeft + object.xvelocity + "px";
        object.yvelocity = object.yvelocity - object.gravity;
        angle = Math.atan2(object.yvelocity, object.xvelocity);
        object.style.transform = "rotate(" + angle + "rad)";
        console.log(object.yvelocity);
        console.log(object.gravity);
    }
}

function getMouse(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var shooterx = shooter.offsetLeft + 37.5;
    var shootery = shooter.offsetTop + 37.5;
    opposite = y - shootery;
    adjacent = x - shooterx;
    shooter.style.transform = "rotate(" + Math.atan2(opposite, adjacent) + "rad)";
}

function touching(object1, object2) {
    var object1LeftSide = object1.offsetLeft;
    var object1RightSide = object1.offsetLeft + object1.offsetWidth;
    var object1TopSide = object1.offsetTop;
    var object1BottomSide = object1.offsetTop + object1.offsetHeight;

    var object2LeftSide = object2.offsetLeft;
    var object2RightSide = object2.offsetLeft + object2.offsetWidth;
    var object2TopSide = object2.offsetTop;
    var object2BottomSide = object2.offsetTop + object2.offsetHeight;

    var objectsTouchingHorizontally = object1RightSide >= object2LeftSide && object1LeftSide <= object2RightSide;
    var objectsTouchingVertically = object1BottomSide >= object2TopSide && object1TopSide <= object2BottomSide;

    return objectsTouchingHorizontally && objectsTouchingVertically;
}
