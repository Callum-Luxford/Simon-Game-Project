let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

let nextSequence = () => {
    userClickedPattern = [];
    level++
    $('h1').text('Level ' + level)
    let randomNumber = Math.floor(Math.random() * 4)
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
    // Call answerCheck() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    answerCheck(userClickedPattern.length -1) 
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
    if(!gameStarted) {
        nextSequence()
        gameStarted = true
    }
})

// Mobile button to start the game..
$('.start-button').on('touchstart', function () {
    $('.start-button').addClass('pressed')
    setTimeout(function () {
        $('.start-button').removeClass('pressed')
    }, 100)

    if(!gameStarted) {
        nextSequence()
        gameStarted = true
    }
})
// Mobile button to start the game..

let answerCheck = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
            console.log('true')
        }

    } else  {
        console.log('false')
        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver()
    }     
}

let startOver = () => {
    level = 0
    gamePattern = []
    gameStarted = false
}
    