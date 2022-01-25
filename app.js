const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeScreen = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const backgroundCircle = ['45deg, rgba(237,4,208,1) 0%, rgba(2,117,187,1) 100%', 
                    '90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%', 
                    '90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%',
                    '45deg, rgba(205,237,4,1) 0%, rgba(182,2,187,1) 100%',
                    '45deg, rgba(4,237,120,1) 0%, rgba(2,144,187,1) 100%']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = +(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
    let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeScreen.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
    timeScreen.parentNode.remove()
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const background = getRandomColorCircle()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `linear-gradient(${background})`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColorCircle() {
    const index = Math.floor(Math.random() * backgroundCircle.length)
    return backgroundCircle[index]
}