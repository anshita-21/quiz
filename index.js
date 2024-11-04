document.addEventListener('DOMContentLoaded', () => {
    axios.get('./data.json')
        .then(response => {
            const quizData = response.data;

            document.getElementById('quizTitle').textContent = quizData.topic;
            document.getElementById('totalQuestions').textContent = quizData.questions.length;

            const totalScore = quizData.questions.reduce((accumulator, question) => {
                return accumulator + question.score;
            }, 0);
            document.getElementById('totalScore').textContent = totalScore;
        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
});

const startButton = document.getElementById('startQuiz');
startButton.addEventListener('click', setName);

function setName() {
    const name = document.getElementById('UserName').value; 
    if (name) {
        localStorage.setItem('userName', name);
    } else {
        console.log("Name is empty. Please enter a name.");
    }
}
