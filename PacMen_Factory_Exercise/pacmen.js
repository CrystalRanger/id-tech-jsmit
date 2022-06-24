let pos = 0;
let animated = false;
let started = false;
const pacArray = [
  './images/PacMan1.png', './images/PacMan2.png',
];
const DOTSIZE = 50;
const WINWIDTH = window.innerWidth;
  const WINHEIGHT = window.innerHeight;
let direction = 0;
const pacMen = []; // This array holds all the pacmen
const ghosts = [];
const dots = [];
function inRange(n, min, max) {
  return n >= min && n <= max;
}
// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let imgindex = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[imgindex];
  newimg.width = 100;

  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;
  newimg.style.zIndex = '0';
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    imgindex,
  };
}

function createGhost() {
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  position.x += WINWIDTH - 300;
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/ghost.png';
  newimg.width = 100;
  

  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;
  newimg.style.zIndex = '0';

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}
//animate the pacmen

function animate() {
		pacMen.forEach((item) => {
      item.imgindex = (item.imgindex == 0) ? 1 : 0;
      item.newimg.src = pacArray[item.imgindex];
    })
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  started = true;
  moveGhosts();
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });

  

  setTimeout(update, 20);
  if (!animated) {
    setInterval(animate, 500);
    animated = true
  }
}

function moveGhosts() {
  ghosts.forEach((item) => {
    ghostCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
}

function createDots() {
  dots.splice(0);
  const ROWS = ((WINHEIGHT - 30) / DOTSIZE) - 2;
  const COLS = (WINWIDTH / DOTSIZE) - 2;
  let position = {x: DOTSIZE, y: DOTSIZE + 30};
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      let dot = document.createElement('div');
      dot.classList = "dot";
      dot.style.top = position.y;
      dot.style.left = position.x;
      dot.style.borderWidth = DOTSIZE/4;
      document.getElementById("game").appendChild(dot);
      dots.push({
        position: {x: position.x, y: position.y},
        div: dot,
      });
      console.log("position x" + position.x);
      position.x += DOTSIZE;
    }
    position.y += DOTSIZE;
    position.x = DOTSIZE
  }
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  const WINWIDTH = window.innerWidth;
  const WINHEIGHT = window.innerHeight;
  //check collision with the wall
  if(item.position.x > WINWIDTH - item.newimg.width) {
    item.velocity.x = item.velocity.x * -1;
    item.position.x = WINWIDTH - item.newimg.width;
  } else if(item.position.x < 0) {
    item.velocity.x = item.velocity.x * -1; 
    item.position.x = 0;
  }
  if(item.position.y > WINHEIGHT - item.newimg.height) {
    item.velocity.y = item.velocity.y * -1;
    item.position.y = WINHEIGHT - item.newimg.height;
  } else if(item.position.y < 0) {
    item.velocity.y = item.velocity.y * -1; 
    item.position.y = 0;
  }
  dots.forEach((item2) => {
    if(inRange(item2.position.x, item.position.x, item.position.x + item.newimg.width) && 
    inRange(item2.position.y, item.position.y, item.position.y + item.newimg.height)
    ) {
      item2.div.remove();
    }
  });
  ghosts.forEach((item2) => {
    if(inRange(item.position.x, item2.position.x - 20, item2.position.x + item2.newimg.width + 20) && 
    inRange(item.position.y, item2.position.y - 20, item2.position.y + item2.newimg.height + 20) ||
    inRange(item2.position.x, item.position.x, item.position.x + item.newimg.width) && 
    inRange(item2.position.y, item.position.y, item.position.y + item.newimg.height)) {
      item.newimg.remove();
      pacMen.splice(pacMen.indexOf(item),1);
    }
  })
}

function ghostCollisions(item) {
  const WINWIDTH = window.innerWidth;
  const WINHEIGHT = window.innerHeight;
  //check collision with the wall
  if(item.position.x > WINWIDTH - item.newimg.width) {
    item.velocity.x = item.velocity.x * -1;
  } else if(item.position.x < 0) {
    item.velocity.x = item.velocity.x * -1; 
  }
  if(item.position.y > WINHEIGHT - item.newimg.height) {
    item.velocity.y = item.velocity.y * -1;
  } else if(item.position.y < 0) {
    item.velocity.y = item.velocity.y * -1; 
  }

}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

function addGhost() {
  ghosts.push(createGhost());
}
//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
