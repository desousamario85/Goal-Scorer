// Main game variables
const startDiv = document.getElementById('start-game');
const endDiv = document.getElementById('end-game');
const nextshotDiv = document.getElementById('next-shot');
const showBall = document.getElementsByClassName('ball-start-position')[0];
const levelSelected = document.getElementsByClassName('levels')[0].children;

const outcome = document.getElementById('kick-outcome');
let totalkicks = 1;
const ballKicked = new Audio('assets/audio/soccer-ball-kick.wav');
const crowdBooAudio = new Audio('assets/audio/goal-save-audio.mp3');
const crowdCheerAudio = new Audio('assets/audio/goal-scored-audio.mp3');

// Checks to see if game needs to start

startDiv.addEventListener('click', startGame, false);

// Checks to see if game needs to end

endDiv.addEventListener('click', endGame, false);

// Get the modal
const modal = document.getElementById('select-level');
const modal2 = document.getElementById('how-to-play');
// Get the button that opens the modal
const btn = document.getElementById('levelbtn');
const btn2 = document.getElementById('htpbtn');

// Get the <span> element that closes the modal
const spans = document.getElementsByClassName('close');

/**
 * Creates all the goals selection boxes for the user
 * to select to determine if they scored.
 * Also checking to see if the user has selected a level to play and if not the Level Modal will appear
 */
function startGame() {
    if (typeof goalSetting !== 'undefined') {
        btn.style.display = 'none';

        for (let i = 0; i < goalSetting; i++) {
            const goalsNet = document.getElementById('goals-posts-outer');
            const element = document.createElement('div');
            element.className = 'goals-posts-inner';
            goalsNet.appendChild(element);
            goalsNet.children.item(i).innerHTML = i;
        }
        showBall.classList.remove('ball-start-position');
        void showBall.offsetWidth;
        showBall.classList.add('ball-start-position');
        startDiv.style.visibility = 'hidden';
        endDiv.style.visibility = 'visible';
        showBall.style.visibility = 'visible';

        const goalSectionSelected = document.getElementsByClassName('goals-posts-inner');
        for (const goalSelected of goalSectionSelected) {
            goalSelected.addEventListener('click', function(event) {
                stopNextKick();
                audioCheck = document.getElementById('audio-check').checked;
                if (audioCheck == true) {
                    playAudio();
                }

                const randomNumber = Math.floor(Math.random() * (1, goalSetting));
                if (this.innerHTML == randomNumber) {
                    this.setAttribute('style', "background: url('assets/images/goalkeeper.png') no-repeat center center; pointer-events:none");
                    outcome.style.display = 'block';
                    outcome.textContent = 'Goal Saved';
                    audioCheck = document.getElementById('audio-check').checked;
                    if (audioCheck == true) {
                        saveGoalAudio();
                    }
                } else {
                    this.setAttribute('style', "background: url('assets/images/soccer-ball.png') no-repeat center center;pointer-events:none;background-size: 33%");
                    void showBall.offsetWidth;
                    incrementgameScore();
                    outcome.textContent = 'Goal!!!!';
                    outcome.style.display = 'block';
                    audioCheck = document.getElementById('audio-check').checked;
                    if (audioCheck == true) {
                        goalScoredAudio();
                    }
                }
                addTotalkicks();
            });
        }
    } else {
        modal.style.display = 'block';
        wasGameStarted = true;
    }
}

/**
 * Prevent user from selecting another box before clicking on Next Kick
 */
function stopNextKick() {
    const goalSectionSelected = document.getElementsByClassName('goals-posts-inner');
    for (const goalSelected of goalSectionSelected) {
        goalSelected.setAttribute('style', 'pointer-events:none');
    }
}

nextshotDiv.addEventListener('click', nextKick);

function nextKick() {
    const goalSectionSelected = document.getElementsByClassName('goals-posts-inner');
    for (const goalSelected of goalSectionSelected) {
        goalSelected.setAttribute('style', 'pointer-events:auto');
        nextshotDiv.style.visibility = 'hidden';
        resetBallAnimation();
        outcome.style.display = 'none';
    }
}

/**
 * Removing and readding the CSS Class to allow the animation to
 * replay,to emulate a ball rolling into place.
 */

function resetBallAnimation() {
    showBall.classList.remove('ball-start-position');
    void showBall.offsetWidth;
    showBall.setAttribute('style', "background: url('assets/images/soccer-ball.png') no-repeat center center;");
    showBall.classList.add('ball-start-position');
    showBall.style.visibility = 'visible';
}

// check to see which level a user has selected
for (level of levelSelected) {
    level.addEventListener('click', function(event) {
        if (this.innerText === 'Easy') {
            goalSetting = 12;
        } else if (this.innerText === 'Meduim') {
            goalSetting = 9;
        } else if (this.innerText === 'Hard') {
            goalSetting = 6;
        } else {
            alert('Invalid selection. Please ensure a level is selected.');
            throw 'No level selected'
        }

        highlightLevelSection();
        this.classList.add('levels-selected');
        modal.style.display = 'none';


        if (typeof wasGameStarted !== 'undefined') {
            if (wasGameStarted === true) {
                startGame();
            }
        }
    });
}

/**
 * Highlight the user selected Level
 *  */
function highlightLevelSection() {
    for (level of levelSelected) {
        level.classList.remove('levels-selected');
    }
}
/**
 * Incrementing the score when a goal is scored
 */

function incrementgameScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Resetting game by removing all the boxed created.
 * Resetting scorecard
 *  * */
function endGame() {
    const goalNets = document.getElementsByClassName('goals-posts-inner');
    while (goalNets.length > 0) goalNets[0].remove();

    startDiv.style.visibility = 'visible';
    endDiv.style.visibility = 'hidden';
    showBall.style.visibility = 'hidden';
    nextshotDiv.style.visibility = 'hidden';
    document.getElementById('score').innerText = 0;
    btn.style.display = 'block';
    outcome.style.display = 'none';
    totalkicks = 1;
}

/** Play a small audio kick on someone kicking a ball
 * when the user selects a box and if the Sound Effects is enabled.
 */
function playAudio() {
    ballKicked.play();
}

function saveGoalAudio() {
    crowdBooAudio.play();
}

function goalScoredAudio() {
    crowdCheerAudio.play();
}

// Modal Functions

// Checking which Modal to be closed
for (const span of spans) {
    span.addEventListener('click', (event) => {
        const level1parent = span.parentNode;
        const selectedModal = level1parent.parentNode;
        selectedModal.style.display = 'none';
    });
}

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = 'block';
};
btn2.onclick = function() {
    modal2.style.display = 'block';
};

/**
 * Checks total kicks taken, restricting player to 10 kicks
 *  */
function addTotalkicks() {
    if (totalkicks == 10) {
        nextshotDiv.style.visibility = 'hidden';
        const totalGoals = parseInt(document.getElementById('score').innerText);
        outcome.textContent = `You have scored ${totalGoals}/10`;
    } else {
        ++totalkicks;
        nextshotDiv.style.visibility = 'visible';
        showBall.setAttribute('style', "background: url('assets/images/soccer-player.png') no-repeat center center; visibility:visible");

    }
}