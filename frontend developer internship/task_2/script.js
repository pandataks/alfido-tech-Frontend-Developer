const questions = [
{
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
        { text: "link", correct: false },
        { text: "a", correct: true },
        { text: "href", correct: false },
        { text: "url", correct: false }
    ]
},
{
    question: "What does CSS stand for?",
    answers: [
        { text: "Creative Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Sheets", correct: false },
        { text: "Colorful Style Sheets", correct: false }
    ]
},
{
    question: "Which company developed JavaScript?",
    answers: [
        { text: "Google", correct: false },
        { text: "Microsoft", correct: false },
        { text: "Netscape", correct: true },
        { text: "Meta", correct: false }
    ]
},
{
    question: "Which method selects an element by ID?",
    answers: [
        { text: "querySelectorAll()", correct: false },
        { text: "getElementById()", correct: true },
        { text: "getElements()", correct: false },
        { text: "selectById()", correct: false }
    ]
},
{
    question: "What does API stand for?",
    answers: [
        { text: "Application Programming Interface", correct: true },
        { text: "Advanced Program Integration", correct: false },
        { text: "Application Process Interface", correct: false },
        { text: "Application Program Integration", correct: false }
    ]
},
{
    question: "Which Git command uploads code to GitHub?",
    answers: [
        { text: "git push", correct: true },
        { text: "git add", correct: false },
        { text: "git commit", correct: false },
        { text: "git clone", correct: false }
    ]
},
{
    question: "Which CSS layout system is one-dimensional?",
    answers: [
        { text: "Grid", correct: false },
        { text: "Flexbox", correct: true },
        { text: "Float", correct: false },
        { text: "Table", correct: false }
    ]
},
{
    question: "What does DOM stand for?",
    answers: [
        { text: "Document Object Model", correct: true },
        { text: "Desktop Object Model", correct: false },
        { text: "Data Object Model", correct: false },
        { text: "Document Orientation Method", correct: false }
    ]
},
{
    question: "Which keyword declares a constant in JavaScript?",
    answers: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "const", correct: true },
        { text: "fixed", correct: false }
    ]
},
{
    question: "Which HTML tag inserts an image?",
    answers: [
        { text: "image", correct: false },
        { text: "img", correct: true },
        { text: "pic", correct: false },
        { text: "src", correct: false }
    ]
}
];

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const playerNameInput = document.getElementById("player-name");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const progressFill = document.getElementById("progress-fill");
const questionNumber = document.getElementById("question-number");

const liveScore = document.getElementById("live-score");

const finalScore = document.getElementById("final-score");
const accuracy = document.getElementById("accuracy");

const certificateName =
document.getElementById("certificate-name");

const rankEmoji =
document.getElementById("rank-emoji");

const rankTitle =
document.getElementById("rank-title");

const leaderboardList =
document.getElementById("leaderboard-list");

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextButton);
playAgainBtn.addEventListener("click", restartQuiz);

loadLeaderboard();

function startQuiz(){

    playerName = playerNameInput.value.trim();

    if(playerName === ""){
        alert("Please enter your name.");
        return;
    }

    welcomeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;

    liveScore.textContent = score;

    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion =
    questions[currentQuestionIndex];

    questionNumber.textContent =
    currentQuestionIndex + 1;

    progressFill.style.width =
    ((currentQuestionIndex + 1) /
    questions.length) * 100 + "%";

    questionElement.textContent =
    currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{

        const button =
        document.createElement("button");

        button.textContent =
        answer.text;

        button.classList.add("btn");

        if(answer.correct){
            button.dataset.correct = true;
        }

        button.addEventListener(
            "click",
            selectAnswer
        );

        answerButtons.appendChild(button);

    });
}

function resetState(){

    nextBtn.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(
            answerButtons.firstChild
        );
    }
}

function selectAnswer(e){

    const selectedBtn = e.target;

    const isCorrect =
    selectedBtn.dataset.correct === "true";

    if(isCorrect){

        score++;

        liveScore.textContent =
        score;

        selectedBtn.classList.add(
            "correct"
        );
    }
    else{
        selectedBtn.classList.add(
            "incorrect"
        );
    }

    Array.from(answerButtons.children)
    .forEach(button=>{

        if(
            button.dataset.correct ===
            "true"
        ){
            button.classList.add(
                "correct"
            );
        }

        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

function handleNextButton(){

    currentQuestionIndex++;

    if(
        currentQuestionIndex <
        questions.length
    ){
        showQuestion();
    }
    else{
        showResult();
    }
}

function showResult(){

    quizScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.remove(
        "hidden"
    );

    finalScore.textContent =
    score;

    const percent =
    Math.round(
        (score / questions.length) *
        100
    );

    accuracy.textContent =
    percent + "%";

    certificateName.textContent =
    playerName;

    let rank = "";
    let emoji = "";

    if(score === 10){
        rank =
        "Frontend Master";
        emoji = "🏆";
    }
    else if(score >= 8){
        rank =
        "Future Developer";
        emoji = "🚀";
    }
    else if(score >= 6){
        rank =
        "Rising Coder";
        emoji = "⭐";
    }
    else if(score >= 4){
        rank =
        "Learner";
        emoji = "📚";
    }
    else{
        rank =
        "Beginner";
        emoji = "🌱";
    }

    rankTitle.textContent =
    rank;

    rankEmoji.textContent =
    emoji;

    saveScore(
        playerName,
        score
    );
}

function restartQuiz(){

    resultScreen.classList.add(
        "hidden"
    );

    welcomeScreen.classList.remove(
        "hidden"
    );

    playerNameInput.value = "";
}

function saveScore(name, score){

    let leaderboard =
    JSON.parse(
        localStorage.getItem(
            "quizLeaderboard"
        )
    ) || [];

    leaderboard.push({
        name,
        score
    });

    leaderboard.sort(
        (a,b)=>
        b.score - a.score
    );

    leaderboard =
    leaderboard.slice(0,5);

    localStorage.setItem(
        "quizLeaderboard",
        JSON.stringify(
            leaderboard
        )
    );

    loadLeaderboard();
}

function loadLeaderboard(){

    leaderboardList.innerHTML = "";

    let leaderboard =
    JSON.parse(
        localStorage.getItem(
            "quizLeaderboard"
        )
    ) || [];

    leaderboard.forEach(
        (player,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML =
        `<span>
        ${index+1}. ${player.name}
        </span>

        <strong>
        ${player.score}/10
        </strong>`;

        leaderboardList.appendChild(
            li
        );

    });
}