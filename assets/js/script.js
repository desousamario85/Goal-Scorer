var startDiv = document.getElementById("start-game");

var endDiv = document.getElementById("end-game")
var nextshotDiv = document.getElementById("next-shot")
var showBall = document.getElementsByClassName("ball-start-position")[0]
var levelSelected = document.getElementsByClassName("levels")[0].children
var elementlevelSelected
console.log(levelSelected)

console.log("Update refreshed 8")

console.log(showBall)

console.log(startDiv)
startDiv.addEventListener('click', startGame, false)
endDiv.addEventListener('click', endGame, false)


function startGame() {

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
                var audio = new Audio('../assets/audio/soccer-ball-kick.wav');
                audio.play()
                let randomNumber = Math.floor(Math.random() * (1, goalSetting));
                if (this.innerHTML == randomNumber) {
                    this.setAttribute("style", "background: url('assets/images/goalkeeper.png') no-repeat center center; pointer-events:none")
                    showBall.setAttribute("style", "background: url('assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                    console.log(randomNumber)
                    nextshotDiv.style.visibility = "visible"
                } else {
                    console.log(randomNumber)
                    this.setAttribute("style", "background: url('assets/images/soccer-ball.png') no-repeat center center;pointer-events:none;background-size: 33%");
                    showBall.setAttribute("style", "background: url('assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                    void showBall.offsetWidth;
                    nextshotDiv.style.visibility = "visible"
                    incrementgameScore()

                }

            }

        )

    }


}

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

function resetBallAnimation() {
    showBall.classList.remove("ball-start-position");
    void showBall.offsetWidth;
    showBall.setAttribute("style", "background: url('assets/images/soccer-ball.png') no-repeat center center;")
    showBall.classList.add("ball-start-position");
    showBall.style.visibility = "visible"
}


for (level of levelSelected) {
    level.addEventListener('click', function(event) {
        if (this.innerText === "Easy") {
            goalSetting = 12

        } else if (this.innerText === "Meduim") {
            goalSetting = 9

        } else if (this.innerText === "Hard") {
            goalSetting = 6

        } else if (this.innerText === "Very Hard") {
            goalSetting = 4

        } else if (this.innerText == "The Impossible") {
            goalSetting = 2

        } else {
            alert('Invalid selection. Please ensure a level is selected.')

        }

        highlightLevelSection()
        this.classList.add("levels-selected")


    })



}

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

function endGame() {

    let goalNets = document.getElementsByClassName("goals-posts-inner")
    while (goalNets.length > 0) goalNets[0].remove()

    startDiv.style.visibility = "visible"
    endDiv.style.visibility = "hidden"
    showBall.style.visibility = "hidden"
    nextshotDiv.style.visibility = "hidden"
    document.getElementById("score").innerText = 0
}