let startDiv = document.getElementById("start-game");
let endDiv = document.getElementById("end-game")
let nextshotDiv = document.getElementById("next-shot")
let showBall = document.getElementsByClassName("ball-start-position")[0]
console.log("Update refreshed 6")

console.log(showBall)

console.log(startDiv)
startDiv.addEventListener('click', startGame, false)

function startGame() {

    let goalSetting = 12;

    for (let i = 0; i < goalSetting; i++) {
        let goalsNet = document.getElementById("goals-posts-outer")
        let element = document.createElement('class')
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
                stopNextKick;
                var audio = new Audio('../assets/audio/soccer-ball-kick.wav');
                audio.play()
                let randomNumber = Math.floor(Math.random() * (1, goalSetting));
                if (this.innerHTML == randomNumber) {
                    this.setAttribute("style", "background: url('../assets/images/goalkeeper.png') no-repeat center center; pointer-events:none")
                    showBall.setAttribute("style", "background: url('../assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                    console.log(randomNumber)
                    nextshotDiv.style.visibility = "visible"
                } else {
                    console.log(randomNumber)
                    this.setAttribute("style", "background: url('../assets/images/soccer-ball.png') no-repeat center center;pointer-events:none");
                    showBall.setAttribute("style", "background: url('../assets/images/soccer-player.png') no-repeat center center; visibility:visible");
                    void showBall.offsetWidth;
                    nextshotDiv.style.visibility = "visible"

                }

            }

        )

    }


}

function stopNextKick() {

    for (let goalSelected of goalSectionSelected) {
        this.setAttribute("style", "pointer-events:none")
        console.log("triggered")
    }
}