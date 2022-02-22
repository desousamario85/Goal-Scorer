let startDiv = document.getElementById("start-game");
let endDiv = document.getElementById("end-game")

console.log(startDiv)
startDiv.addEventListener('click', startGame)

function startGame() {

    let goalSetting = 13;

    for (let i = 1; i < goalSetting; i++) {
        let goalsNet = document.getElementById("goals-posts-outer")
        let element = document.createElement('class')
        element.className = "goals-posts-inner"
        goalsNet.appendChild(element)
        goalsNet.children.item(i - 1).innerHTML = i

        console.log(`Goal ${i} net create`)


    }
    startDiv.style.visibility = "hidden"
    endDiv.style.visibility = "visible"

}