const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let numberCorrect

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    numberCorrect = 0
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    if(currentQuestionIndex < shuffledQuestions.length){
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }else{
        //also mine
        showEnd()
    }
}

//mine lol
function showEnd(){
    questionElement.innerText = 'You completed the quiz!'
    const button = document.createElement('button')
    button.innerText = 'Your score: '
    const button2 = document.createElement('button')
    button2.innerText = '' + numberCorrect + ' out of ' + questions.length + ' = ' + numberCorrect / questions.length * 100 + '%'
    const button3 = document.createElement('button')
    button3.addEventListener('click', startGame)
    button3.innerText = 'Try Again?'
    answerButtonsElement.appendChild(button)
    answerButtonsElement.appendChild(button2)
    answerButtonsElement.appendChild(button3)
    if(numberCorrect === questions.length){
        const button4 = document.createElement('button')
        button4.addEventListener('click', windowRedirect)
        button4.innerText = 'Congrats! you got 100% and unlocked the secret room CLICK HERE'
        answerButtonsElement.appendChild(button4)
    }

}

function windowRedirect(){
    window.location = 'andrew-cantrell/plz-hire-me.html'
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex) {
        nextButton.classList.remove('hide')
    }
    // if (shuffledQuestions.length > currentQuestionIndex + 1) {
    //     nextButton.classList.remove('hide')
    // } else {
    //     startButton.innerText = 'Restart'
    //     startButton.classList.remove('hide')
    // }
    if(correct){
        numberCorrect += 1
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
//TODO write a read in function from JSON files or something similar
//TODO choose a quiz to take
const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true }
        ]
    },
    {
        question: 'Should you work at Udemy?',
        answers: [
            {text: 'YES', correct: true},
            {text: 'ehhh I do not know', correct: false},
            {text: 'Probably not', correct: false},
            {text: 'No', correct: false},
        ]
    }
]