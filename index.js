let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

let nextSequence = () => {
    userClickedPattern = [];
    level++
    $('h1').text('Level ' + level)
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    
    playSound(randomChosenColor)
    animateButton(randomChosenColor)
}

$('.btn').on('click', function () {
    let userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern)
    playSound(userChosenColor)
    animateButton(userChosenColor)
    answerCheck(userClickedPattern)
})

let playSound = (name) => {
    let audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

let animateButton = (currentColor) => {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 100)
}

$(document).on('keydown', function () {
    nextSequence()
})

let answerCheck = (currentLevel) => {
    if(!gameStarted) {
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
        console.log('true')
    } else {
        console.log('false')
    }
}