//INITIAL DATA
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//EVENTS
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//FUNCTIONS
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHTML = '';
        for(let i in q.options) {
            optionsHTML += `
                <div data-op="${i}" class="option">
                    <span>${parseInt(i)+1}</span>${q.options[i]}
                </div>
            `;
        }

        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points <= 30) {
        document.querySelector('.scoreText1').innerHTML = "Don't give up, try again!";
        document.querySelector('.scorePct').style.color = 'red';
    } else if(points > 30 && points <= 70) {
        document.querySelector('.scoreText1').innerHTML = "It was close! You can improve.";
        document.querySelector('.scorePct').style.color = 'yellow';
    } else {
        document.querySelector('.scoreText1').innerHTML = "Amazing!!!";
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `${points}%`;
    document.querySelector('.scoreText2').innerHTML = `
        You got ${correctAnswers} questions right out of ${questions.length}!
    `;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    currentQuestion = 0;
    correctAnswers = 0;

    showQuestion();
}