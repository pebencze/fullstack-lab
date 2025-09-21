// document.getElementById("count-el").innerText = 5

let count = 0
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")


function increment() {    
    count = count + 1
    countEl.innerText = count
    console.log("a new passenger entered")
}

function save() {
    let countStr = count + " - "
    saveEl.textContent += countStr // textContent is better here than innerText
    console.log(count)
    count = 0
    countEl.innerText = count
}
