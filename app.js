const start = document.querySelector('#start');
const stage = document.querySelector('#stage');
const guess = document.querySelector('#guess')
const submit = document.querySelector('#submit');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');
const inputs = document.querySelectorAll('input');
let rgb = [0, 0, 0];
let highScore = 0;

// Starts game
start.addEventListener('click', () => {
    start.classList.toggle('hidden');
    guess.classList.toggle('hidden');
    submit.classList.toggle('hidden');
    rgb = generateRGB();
    stage.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
})

// Evaluates answers
submit.addEventListener('click', () => {
    let compare = [document.getElementById('redGuess').value, document.getElementById('greenGuess').value,
    document.getElementById('blueGuess').value];

    //Input validation
    for (let i = 0; i < 3; i++) {
        if (compare[i] == '') {
            alert('Please guess each color channel value before submitting.')
            return;
        } else if (compare[i] > 255 || compare[i] < 0) {
            alert('Please only guess numbers between 0 and 255.');
            return;
        }
    }

    // Score calculation
    let score = 0;
    for (let i = 0; i < 3; i++) {
        let comparison = Math.abs(compare[i] - rgb[i]);
        if (comparison > 99) {
            comparison = 255; //Force score addition of 0 if guess is >100 off
        }
        score += Math.round(Math.pow(comparison * -1 + 255, 1.2466));
    }

    //Score display
    result.classList.toggle('hidden');
    submit.classList.toggle('hidden');
    result.children[0].innerText = `${score} POINTS (R: ${rgb[0]}, G: ${rgb[1]}, B: ${rgb[2]})`;
    stage.children[0].classList.remove('hidden');

    if (score > highScore) {
        highScore = score;
        stage.children[0].innerText = `High Score: ${highScore}`;
    }
})

// Restarts game
restart.addEventListener('click', () => {
    result.classList.toggle('hidden');
    for (input of inputs) {
        input.value = '';
    }
    rgb = generateRGB();
    stage.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    submit.classList.toggle('hidden');
})

// Generates random RGB values 
function generateRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let rgb = [r, g, b];
    return rgb;
}