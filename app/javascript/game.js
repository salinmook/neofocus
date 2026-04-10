// fix bug for repeating shapes
const shapeMap = {
    circle: ['circle-red', 'circle-blue'],
    square: ['square-green', 'square-watermelon-pink'],
    oval : ['oval-indigo', 'oval-pink'],
    pentagon: ['pentagon-orange', 'pentagon-purple'],
    star: ['star-yellow', 'star-mandarin'],
    octagon: ['octagon-marine', 'octagon-grass']
};
let timer;
let timeLeft = 50;
let hits = 0;
let currentLevel = 1;

//shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//Random class shapes
function getRandomClass(shapeType) {
    const variations = shapeMap[shapeType];
    return variations[Math.floor(Math.random() * variations.length)];
}
// render position shapes
function getRandomPosition(width, height, existing) {
    const canvas = document.getElementById('game-canvas');

    let x, y, tries = 0;
    do {
        x = Math.floor(Math.random() * (canvas.clientWidth - width));
        y = Math.floor(Math.random() * (canvas.clientHeight - height));
        tries++;
        if(tries > 200) break;
        } while (existing.some(pos => Math.abs(pos.x - x) < width + 10
    && Math.abs(pos.y - y) < height + 10));
    return {x, y};
}
//Start game

function startGame(level) {
    currentLevel = level;
    timeLeft = 50;
    hits = 0;
    clearInterval(timer);
    //reset timer bar
    const timerBar = document.getElementById('timer-bar');
    if(timerBar) timerBar.style.width = "100%";
    timer = setInterval(updateTimer, 1000);
    renderNewRound();
    console.log(`Started level ${level}`);
}
//timer
function updateTimer() {
    timeLeft--;

    const timerBar = document.getElementById('timer-bar');
    if (timerBar) timerBar.style.width = (timeLeft / 50 * 100) + "%";
    if(timeLeft <= 0) {
        clearInterval(timer);
        checkWinCondition();
    }
}
//Render new round
function renderNewRound() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    canvas.innerHTML = '';
    const pairCount = (currentLevel === 1) ? 3 : (currentLevel === 2 ? 4 : 5);
    // take all shape types
    let shapeTypes = shuffle(Object.keys(shapeMap));
    //shuffle

    //select non-repeat shape types (pair+odd)
    let selectedTypes = shapeTypes.slice(0, pairCount + 1);
    let displayList = [];
    let positions = [];
    //make pair
    for (let i = 0; i < pairCount; i++)
    {

        const cls = getRandomClass(selectedTypes[i]);
        displayList.push(cls, cls);
    }
    //Odd

    const oddShape = getRandomClass(selectedTypes[pairCount]);
    displayList.push(oddShape);
    //shuffle list
    displayList = shuffle(displayList);
    //render
    displayList.forEach(shapeClass => {
        const div = document.createElement('div');
        div.className = shapeClass + " game-shape";

        const width = div.offsetWidth || 65;
        const height = div.offsetHeight || 65;
        const pos = getRandomPosition(width, height, positions);
        positions.push({...pos, width, height});
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        div.onclick = function () {
            if(shapeClass === oddShape) {
                hits++;
                renderNewRound();
            } else {
                if(!div.querySelector('.cross-mark')) {
                    const cross = document.createElement('span');
                    cross.className = 'cross-mark';
                                                cross.innerText = 'X';
                                                cross.style.cssText =
                                                `position:absolute;
                                                font-size:16px;
                                                color:red;
                                                top:0;
                                                left:0;
                                                pointer-events:none;`;
                                                div.appendChild(cross);


                }
            }
        };
        canvas.appendChild(div);
    });
}
//check win condition
function checkWinCondition() {
    const levelId = document.querySelector('.game-container').dataset.levelId;
    const requireHits = (currentLevel === 1) ? 8 : 9;
    const totalScore = hits * 50

    fetch(`/levels/${levelId}/scores`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        score: {
          level_id: levelId,
          hits: hits,
          score: totalScore
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if(hits >= requireHits) {
          window.location.href = `/levels/${levelId}/won`;
      } else {
          window.location.href = `/levels/${levelId}/lost`;
      }
    })
}

window.startGame = startGame;
window.renderNewRound = renderNewRound;
window.updateTimer = updateTimer;

// Auto-start when game canvas is present
document.addEventListener('turbo:load', function() {
  const container = document.querySelector('.game-container');
  if (container) {
    const levelNumber = parseInt(container.dataset.levelNumber);
    if (levelNumber) startGame(levelNumber);
  }
});

// Pause and resume timer for menu
function pauseTimer() {
  clearInterval(timer);
  // Sync bar to exact timeLeft at moment of pause
  const timerBar = document.getElementById('timer-bar');
  if (timerBar) timerBar.style.width = (timeLeft / 50 * 100) + "%";
}

function resumeTimer() {
  if (timeLeft > 0) {
    clearInterval(timer);
    // Immediately sync bar width before restarting interval
    const timerBar = document.getElementById('timer-bar');
    if (timerBar) timerBar.style.width = (timeLeft / 50 * 100) + "%";
    timer = setInterval(updateTimer, 1000);
  }
}

// freeze timer when menu opens, resume when closed
document.addEventListener('turbo:load', function() {
  // Pause on ANY modal opening
  document.addEventListener('show.bs.modal', function() {
    pauseTimer();
  });

  // Resume ONLY when ALL modals are closed and we're on game canvas
  document.addEventListener('hide.bs.modal', function() {
    setTimeout(() => {
      const anyModalOpen = document.querySelector('.modal.show');
      if (!anyModalOpen && document.querySelector('.game-container')) {
        resumeTimer();
      }
    }, 350);  // small delay to let Bootstrap finish transition
  });
});

window.pauseTimer = pauseTimer;
window.resumeTimer = resumeTimer;
