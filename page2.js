document.addEventListener('DOMContentLoaded', () => {
    axios.get('./data.json')
        .then(response => {
            const quizData = response.data;
            document.getElementById('quizTitle').textContent = quizData.topic;

            let userName = "User One"; 
            document.getElementById('userGreeting').textContent = `Hi, ${userName}`;

            let currentQuestionIndex = 0;
            let score = 0;
            let timeLeft = 60;

            function loadQuestion() {
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
            }

            const timerElement = document.getElementById('timeLeft');
            function startTimer() {
                timeLeft = 60;
                const timer = setInterval(() => {
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
                const questionData = quizData.questions[currentQuestionIndex];
                if (selectedIndex === questionData.correctAnswer) {
                    score += questionData.score;
                    alert("Correct answer!");
                } else {
                    alert("Incorrect answer.");
                }
                document.getElementById('score').textContent = score;
                loadNextQuestion();
            }

            function loadNextQuestion() {
                if (currentQuestionIndex < quizData.questions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                    startTimer(); 
                } else {
                    alert(`Quiz completed! Your final score is: ${score}`);
                }
            }

            loadQuestion();
            startTimer();

        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
});
