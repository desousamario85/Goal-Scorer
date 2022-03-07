//Main game variables
var startDiv = document.getElementById("start-game");
var endDiv = document.getElementById("end-game")
var nextshotDiv = document.getElementById("next-shot")
var showBall = document.getElementsByClassName("ball-start-position")[0]
var levelSelected = document.getElementsByClassName("levels")[0].children
var elementlevelSelected
var outcome = document.getElementById("kick-outcome")


//Checks to see if game needs to start

startDiv.addEventListener('click', startGame, false)


// Checks to see if game needs to end

endDiv.addEventListener('click', endGame, false)

// Get the modal
const modal = document.getElementById("select-level");
const modal2 = document.getElementById("how-to-play");
// Get the button that opens the modal
const btn = document.getElementById("levelbtn");
const btn2 = document.getElementById("htpbtn");


// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("close")


/**
 * Creates all the goals selection boxes for the user
 * to select to determine if they scored. 
 * Also checking to see if the user has selected a level to play and if not the Level Modal will appear
 */
function startGame() {

    if (typeof goalSetting !== 'undefined') {
        btn.style.display = "none"


        for (let i = 0; i < goalSetting; i++) {
            let goalsNet = document.getElementById("goals-posts-outer")
            let element = document.createElement('div')
            element.className = "goals-posts-inner"
            goalsNet.appendChild(element)
            goalsNet.children.item(i).innerHTML = i

            console.log(`Goal ${i} net create`)


        }
        showBall.classList.remove("ball-start-position");
        void showBall.offsetWidth;
        showBall.classList.add("ball-start-position");


        startDiv.style.visibility = "hidden"
        endDiv.style.visibility = "visible"
        showBall.style.visibility = "visible"

        let goalSectionSelected = document.getElementsByClassName("goals-posts-inner")
        console.log(goalSectionSelected)
        for (let goalSelected of goalSectionSelected) {
            goalSelected.addEventListener('click', function(event) {
                    stopNextKick();
                    audioCheck = document.getElementById('audio-check').checked
                    if (audioCheck == true) {
                        playAudio()

                    }

                    let randomNumber = Math.floor(Math.random() * (1, goalSetting));
                    if (this.innerHTML == randomNumber) {
                        this.setAttribute("style", "background: url('assets/images/goalkeeper.png') no-repeat center center; pointer-events:none")
                        showBall.setAttribute("style", "background: url('assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                        console.log(randomNumber)
                        nextshotDiv.style.visibility = "visible"
                        outcome.textContent = "Goal Saved"
                    } else {
                        console.log(randomNumber)
                        this.setAttribute("style", "background: url('assets/images/soccer-ball.png') no-repeat center center;pointer-events:none;background-size: 33%");
                        showBall.setAttribute("style", "background: url('assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                        void showBall.offsetWidth;
                        nextshotDiv.style.visibility = "visible"
                        incrementgameScore()
                        outcome.textContent = "Goal!!!!"

                    }

                }

            )

        }


    } else {
        modal.style.display = "block";
        console.log(modal)
        wasGameStarted = true
    }

}




/**
 * Prevent user from selecting another box before clicking on Next Kick
 */
function stopNextKick() {
    let goalSectionSelected = document.getElementsByClassName("goals-posts-inner")
    for (let goalSelected of goalSectionSelected) {
        goalSelected.setAttribute("style", "pointer-events:none")
        console.log("triggered")
    }
}

nextshotDiv.addEventListener('click', nextKick)

function nextKick() {
    let goalSectionSelected = document.getElementsByClassName("goals-posts-inner")
    for (let goalSelected of goalSectionSelected) {
        goalSelected.setAttribute("style", "pointer-events:auto")
        nextshotDiv.style.visibility = "hidden"
        console.log("triggered");
        resetBallAnimation();
    }
}

/**
 * Removing and readding the CSS Class to allow the animation to
 * replay,to emulate a ball rolling into place.
 */

function resetBallAnimation() {
    showBall.classList.remove("ball-start-position");
    void showBall.offsetWidth;
    showBall.setAttribute("style", "background: url('assets/images/soccer-ball.png') no-repeat center center;")
    showBall.classList.add("ball-start-position");
    showBall.style.visibility = "visible"
}


//check to see which level a user has selected
for (level of levelSelected) {
    level.addEventListener('click', function(event) {
        if (this.innerText === "Easy") {
            goalSetting = 12

        } else if (this.innerText === "Meduim") {
            goalSetting = 9


        } else if (this.innerText === "Hard") {
            goalSetting = 6

        } else {
            alert('Invalid selection. Please ensure a level is selected.')

        }

        highlightLevelSection()
        this.classList.add("levels-selected")
        modal.style.display = "none";
        console.log(startGame)


        if (typeof wasGameStarted !== 'undefined') {
            if (wasGameStarted === true) {
                startGame()
            }


        }



    })
}

/**Highlight the user selected Level */
function highlightLevelSection() {
    for (level of levelSelected) {
        level.classList.remove("levels-selected")
    }
}
/**
 * Incrementing the score when a goal is scored 
 */

function incrementgameScore() {
    let oldScore = parseInt(document.getElementById("score").innerText)
    document.getElementById("score").innerText = ++oldScore

}


/**Reseting game by removing all the boxed created */
function endGame() {

    let goalNets = document.getElementsByClassName("goals-posts-inner")
    while (goalNets.length > 0) goalNets[0].remove()

    startDiv.style.visibility = "visible"
    endDiv.style.visibility = "hidden"
    showBall.style.visibility = "hidden"
    nextshotDiv.style.visibility = "hidden"
    document.getElementById("score").innerText = 0
    btn.style.display = "flex"

}

/**Play a small audio kick on someone kicking a ball 
 * when the user selects a box and if the Sound Effects is enabled.
 */
function playAudio() {
    var audio = new Audio('assets/audio/soccer-ball-kick.wav');
    audio.play()

}


//Modal Functions

//Checking which Modal to be closed
for (let span of spans) {
    span.addEventListener('click', function(event) {
            let level1parent = span.parentNode
            let selectedModal = level1parent.parentNode
            selectedModal.style.display = "none";
        }

    )
}


// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
btn2.onclick = function() {
    modal2.style.display = "block";
}