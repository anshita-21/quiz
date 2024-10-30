document.addEventListener('DOMContentLoaded', () => {
    axios.get('./data.json')
        .then(response => {
            const quizData = response.data;

            document.getElementById('quizTitle').textContent = quizData.topic;

            document.getElementById('totalQuestions').textContent = quizData.questions.length;
        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
});
