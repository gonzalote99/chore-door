let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');

let startButton = document.getElementById('start');
let bootDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closeDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isClicked = (door) => {
  if(door.src == closeDoorPath) {
    return false;
  }

  else {
    return true;
  }
}

const isBot = (door) => {
  if(door.src === bootDoorPath) {
    return true;
  }
  else {
    return false;
  }
}

const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 0) {
    gameOver('win')
  } else if(isBot(door)) {
    gameOver('lose');
  }
}

const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * 6);
  switch(choreDoor) {
    case 0:
    openDoor1 = bootDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
    break;
    case 1:
    openDoor1 = bootDoorPath;
    openDoor3 = spaceDoorPath;
    openDoor2 = beachDoorPath;
   
    break;
    case 2:
    openDoor2 = bootDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
    break;
    case 3:
    openDoor1 = bootDoorPath;
    openDoor3 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    
    break;
    case 4:
    openDoor3 = bootDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    break;
    case 5:
    openDoor3 = bootDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
   
    break;
  }
}


door1.onclick = () => {
  if(currentlyPlaying && !isClicked(door1)) {
    door1.src = openDoor1;
    playDoor(door1);
  }
}

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
    door2.src = openDoor2;
    playDoor(door2);
  }
}

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
    door3.src = openDoor3;
    playDoor(door3);
  }
}

startButton.onclick = () => {
  startRound();
}

const startRound = () => {
  door1.src = closeDoorPath;
  door2.src = closeDoorPath;
  door3.src = closeDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'good luck';
  randomChoreDoorGenerator();
}

const gameOver = (str) => {
  if(str === 'win') {
    startButton.innerHTML = 'win , play again';
    getYourScore();
  } else {
    startButton.innerHTML = 'game over, play again'
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;


}

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if(score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}

startRound();
