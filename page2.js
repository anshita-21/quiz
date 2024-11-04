document.addEventListener('DOMContentLoaded', () => {
    axios.get('./data.json')
        .then(response => {
            const quizData = response.data;
            document.getElementById('quizTitle').textContent = quizData.topic;

            const userName = localStorage.getItem('userName');
            if (userName) {
                const span = document.createElement('span');
                span.innerHTML = `, ${userName}`;
                document.getElementById('displayedName').appendChild(span);
            }

            let currentQuestionIndex = 0;
            let score = 0;
            let timeLeft = 40;
            let timer; 
            let selectedAnswerIndex = null;

            function loadQuestion() {
                clearInterval(timer); 
                selectedAnswerIndex = null; 
                const questionData = quizData.questions[currentQuestionIndex];

                document.querySelector('.question-number').textContent = `Question ${currentQuestionIndex + 1}`;
                document.querySelector('#questionText').textContent = questionData.question;

                const optionsContainer = document.querySelector('#optionsContainer');
                optionsContainer.innerHTML = '';
                questionData.choices.forEach((choice, index) => {
                    const button = document.createElement('button');
                    button.classList.add('option-button');
                    button.textContent = choice;
                    button.addEventListener('click', () => selectAnswer(index));
                    optionsContainer.appendChild(button);
                });

                document.getElementById('checkButton').textContent = "Check";
                document.getElementById('checkButton').disabled = true; 
                document.getElementById('nextButton').style.display = 'none'; 
                document.getElementById('checkButton').style.display = 'block'; 

                startTimer(); 
            }

            const timerElement = document.getElementById('timeLeft');
            function startTimer() {
                timeLeft = 40;
                timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}s`; 
                timer = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}s`;
                    } else {
                        clearInterval(timer);
                        alert("Time's up for this question!");
                        loadNextQuestion();
                    }
                }, 1000);
            }

            function selectAnswer(selectedIndex) {
                selectedAnswerIndex = selectedIndex; 
                const optionsContainer = document.querySelector('#optionsContainer');
                const optionButtons = optionsContainer.querySelectorAll('.option-button');

                optionButtons.forEach((button, index) => {
                    button.style.border = index === selectedIndex ? "2px solid darkblue" : "";
                });

                document.getElementById('checkButton').disabled = false;
            }

            document.getElementById('checkButton').addEventListener('click', () => {
                if (selectedAnswerIndex !== null) {
                    clearInterval(timer); 
                    const questionData = quizData.questions[currentQuestionIndex];
                    const optionsContainer = document.querySelector('#optionsContainer');
                    const optionButtons = optionsContainer.querySelectorAll('.option-button');
                    const remark = document.getElementById('remark');
                    const next = document.getElementById('next');

                    remark.textContent = '';
                    next.textContent = '';

                    if (selectedAnswerIndex === questionData.correctAnswer) {
                        optionButtons[selectedAnswerIndex].classList.add('correct');
                        score += questionData.score;  
                        remark.textContent = "Correct Answer";
                        remark.style.color = 'green';
                    } else {
                        optionButtons[selectedAnswerIndex].classList.add('incorrect');
                        optionButtons[questionData.correctAnswer].classList.add('correct');
                        remark.textContent = `Wrong Answer`;
                        remark.style.color = 'red';
                    }
                    next.textContent = " Please click on Next";
                    next.style.color = 'black';

                    document.getElementById('score').textContent = score;
                    remark.appendChild(next);
                    document.getElementById('checkButton').style.display = 'none';
                    document.getElementById('nextButton').style.display = 'block';
                }
            });

            document.getElementById('nextButton').addEventListener('click', loadNextQuestion);

            let questionScores = []; 

            function loadNextQuestion() {
                if (currentQuestionIndex < quizData.questions.length - 1) {
                    questionScores.push({
                        question: quizData.questions[currentQuestionIndex].question,
                        score: selectedAnswerIndex === quizData.questions[currentQuestionIndex].correctAnswer ? quizData.questions[currentQuestionIndex].score : 0
                    });
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    questionScores.push({
                        question: quizData.questions[currentQuestionIndex].question,
                        score: selectedAnswerIndex === quizData.questions[currentQuestionIndex].correctAnswer ? quizData.questions[currentQuestionIndex].score : 0
                    });
                    showFinalResult();
                }
            }
            
            function showFinalResult() {
                localStorage.setItem('totalScore', score);
                localStorage.setItem('questionScores', JSON.stringify(questionScores));
            
                window.location.href = 'page3.html';
            }
            

            loadQuestion();
        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
});
