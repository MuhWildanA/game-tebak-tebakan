// get element
const startButton = document.getElementById('start-btn')
const restartButton = document.getElementById('restart-btn')
const startScreen = document.getElementById('start-screen')
const quiztScreen = document.getElementById('quiz-screen')
const currentQuestionSpan = document.getElementById('current-question')
const totalQuestionsSpan = document.getElementById('total-questions')
const scoreSpan = document.getElementById('score')
const questionText = document.getElementById('question-text')
const answersContainer = document.getElementById('answers-container')
const progress = document.getElementById('progress')
const resultScreen = document.getElementById('result-screen')
const maxScoreSpan = document.getElementById('max-score')
const finalScoreSpan = document.getElementById('final-score')
const resultMessage = document.querySelector('.result-message')

// questions
const questions = [
    {
        question: "Apa ibu kota Jawa Timur?",
        answers: [
            { text: "Jakarta", correct: false },
            { text: "Surabaya", correct: true },
            { text: "Malang", correct: false },
            { text: "Pasuruan", correct: false }
        ]
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        answers: [
            { text: "Soeharto", correct: false },
            { text: "Ir. Soekarno", correct: true },
            { text: "Jokowi", correct: false },
            { text: "BJ Habibie", correct: false }
        ]
    },
    {
        question: "Berapa hasil dari 5 x 6?",
        answers: [
            { text: "30", correct: true },
            { text: "25", correct: false },
            { text: "35", correct: false },
            { text: "40", correct: false }
        ]
    },
    {
        question: "Hewan berikut yang bisa terbang adalah...",
        answers: [
            { text: "Kucing", correct: false },
            { text: "Burung", correct: true },
            { text: "Ikan", correct: false },
            { text: "Kuda", correct: false }
        ]
    },
    {
        question: "Negara manakah yang terkenal dengan Menara Eiffel?",
        answers: [
            { text: "Italia", correct: false },
            { text: "Jerman", correct: false },
            { text: "Prancis", correct: true },
            { text: "Belanda", correct: false }
        ]
    }
]

// var
const totalQuestions = questions.length
const maxScore = totalQuestions / totalQuestions * 100
let currentQuestionIndex = 0
let score = 0
let finalScore = 0;
let answersDisabled = false

totalQuestionsSpan.textContent = totalQuestions
maxScoreSpan.textContent = maxScore

startButton.addEventListener('click',startQuiz)
restartButton.addEventListener('click',restartQuiz)


function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    finalScore = 0;
    scoreSpan.textContent = score

    startScreen.classList.remove('active')
    quiztScreen.classList.add('active')

    showQuestion()
}

function showQuestion(){
    answersDisabled = false
    const currentQuestion = questions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex +1

    const progressPercent = (currentQuestionIndex / questions.length) * 100
    progress.style.width = progressPercent + '%'

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = ''
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer-btn')

        button.dataset.correct = answer.correct

        button.addEventListener('click',selectAnswer)

        answersContainer.appendChild(button)
    })

}

function selectAnswer(event){
    if(answersDisabled) return
    answersDisabled = true

    const selectedButton = event.target
    const isCorrect = selectedButton.dataset.correct === "true"

    // selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect')
    
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }else if(button == selectedButton){
                button.classList.add('incorrect')
        }
    })

    if(isCorrect){
        score ++
        finalScore = score / totalQuestions * 100
        scoreSpan.textContent = finalScore
    }

    setTimeout(() => {
        currentQuestionIndex++
        if(currentQuestionIndex < totalQuestions){
            showQuestion()
        }else{
            showResult()
        }
    },1000)
}

function showResult(){
    quiztScreen.classList.remove('active')
    resultScreen.classList.add('active')

    finalScoreSpan.textContent = finalScore

    if(finalScore < 50){
        resultMessage.textContent = "Belajar lebih giat!"
    }else if(finalScore < 75){
        resultMessage.textContent = "CUkup Baik"
    }else if(finalScore < 90){
        resultMessage.textContent = "Hebat"
    }else if(finalScore < 99){
        resultMessage.textContent = "Kepintaranmu di atas rata-rata"
    }else{
        resultMessage.textContent = "Nilai sempurna"
    }
}

function restartQuiz(){
    resultScreen.classList.remove('active')
    startQuiz();
}