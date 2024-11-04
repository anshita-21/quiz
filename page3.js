let questionScores = []; 

function loadNextQuestion() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        questionScores.push({
            question: quizData.questions[currentQuestionIndex].question,
            score: selectedAnswerIndex === quizData.questions[currentQuestionIndex].correctAnswer
                ? quizData.questions[currentQuestionIndex].score
                : 0
        });
        currentQuestionIndex++;
        loadQuestion();
    } else {
        questionScores.push({
            question: quizData.questions[currentQuestionIndex].question,
            score: selectedAnswerIndex === quizData.questions[currentQuestionIndex].correctAnswer
                ? quizData.questions[currentQuestionIndex].score
                : 0
        });
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById('quizContainer').style.display = 'none'; 

    const finalResultContainer = document.getElementById('finalResult');
    finalResultContainer.style.display = 'block';

    document.getElementById('finalScore').textContent = `Hey ${userName}, you have scored ${score} points`;

    const scoreDetails = document.getElementById('scoreDetails');
    scoreDetails.innerHTML = '';
    questionScores.forEach((qScore, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Question ${index + 1} : Score ${qScore.score}`;
        scoreDetails.appendChild(listItem);
    });
}
