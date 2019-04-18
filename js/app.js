const gameField = document.querySelector('.game_field');
const statTime = document.querySelector('.time');
const statScore = document.querySelector('.score');
const statBestScore = document.querySelector('.best_score');
const btnMinus = document.querySelector('.btn__time--minus');
const btnPlus = document.querySelector('.btn__time--plus');
const btnStart = document.querySelector('.btn__start');
let score = 0;
let bestScore = 0;
let time = 15;

addZero(time, statTime);

btnStart.addEventListener('click', startGame);
btnMinus.addEventListener('click', () => {
  time = time - 5;
  addZero(time, statTime);
  checkBtnDisabled();
});
btnPlus.addEventListener('click', () => {
  time = time + 5;
  addZero(time, statTime);
  checkBtnDisabled();
});
gameField.addEventListener('click', handleFigureClick);

function startGame() {
  btnStart.setAttribute('disabled', 'disabled');
  btnPlus.setAttribute('disabled', 'disabled');
  btnMinus.setAttribute('disabled', 'disabled');
  renderFigure();
  startTimer();
}

function handleFigureClick(e) {
  if (e.target.classList.contains('shape') && time > 0) {
    
    renderFigure();
    score++;
    addZero(score, statScore);
  }
}

function renderFigure() {
  gameField.innerHTML = '';

  const figure = document.createElement('div');
  figure.classList.add('shape');
  const shape = randomNumber(1, 5);
  const shapeWidth = randomNumber(30, 80);
  let shapeHeight = shapeWidth;

  if (shape === 1) {
    figure.style.borderRadius = '50%';
  } else if (shape === 2) {
    shapeHeight = randomNumber(30, 110);
  } else if (shape === 3) {
    figure.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
  }

  const gameFieldSize = gameField.getBoundingClientRect();
  const offsetTop = gameFieldSize.height - shapeHeight;
  const offsetLeft = gameFieldSize.width - shapeWidth;

  figure.style.width = shapeWidth + 'px';
  figure.style.top = randomNumber(0, offsetTop) + 'px';
  figure.style.left = randomNumber(0, offsetLeft) + 'px';
  figure.style.height = shapeHeight + 'px';
  figure.style.backgroundColor = randomRGB();

  gameField.appendChild(figure);
}

function startTimer() {
  let tik = setInterval(() => {
    time--;
    addZero(time, statTime);

    if (time < 1) {
      clearInterval(tik);
      endGame();
    }
  }, 1000);
}

function endGame() {
  checkScore();
  time = 15;
  score = 0;
  statScore.innerHTML = '00';
  statTime.innerHTML = time;
  gameField.innerHTML = '';
  btnStart.removeAttribute('disabled');
  btnPlus.removeAttribute('disabled');
  btnMinus.removeAttribute('disabled');
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomRGB() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function addZero(num, pos) {
  if (num < 10) {
    pos.innerHTML = "0" + num;
  } else {
    pos.innerHTML = num;
  }
}

function checkBtnDisabled() {
  if (time > 10 && time < 30) {
    btnPlus.removeAttribute('disabled');
    btnMinus.removeAttribute('disabled');
  } else if (time >= 30) {
    btnPlus.setAttribute('disabled', 'disabled');

  } else if (time <= 10) {
    btnMinus.setAttribute('disabled', 'disabled');
  }
}

function checkScore() {
  if (score > bestScore) {
    bestScore = score;
    addZero(bestScore, statBestScore)
  }
}