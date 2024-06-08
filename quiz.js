document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quizContainer");
  const startButton = document.getElementById("startButton");
  const nextButton = document.getElementById("nextButton");

  let questionIndex = 0;
  let questions = [];
  let userAnswers = [];

  // API URL
  const apiUrl = "https://the-trivia-api.com/v2/questions";

  startButton.addEventListener("click", () => {
    fetchQuestionsAndDisplay();
  });

  nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
      userAnswers.push(selectedAnswer.value);
      questionIndex++;
      if (questionIndex < questions.length) {
        displayQuestion(); // Display the next question
      } else {
        showResult(); // Show result if all questions are answered
      }
    } else {
      alert("Please select an answer.");
    }
  });

  function fetchQuestionsAndDisplay() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        questions = data.questions;
        displayQuestion();
        startButton.style.display = "none"; // Hide the start button
        nextButton.style.display = "block"; // Show the next button after fetching questions
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }

  function displayQuestion() {
    const question = questions[questionIndex];
    quizContainer.innerHTML = `<h2>Question ${questionIndex + 1}: ${
      question.question.text
    }</h2>`;
    question.answers.forEach((answer) => {
      const answerLabel = document.createElement("label");
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.name = "answer";
      answerInput.value = answer;
      answerLabel.appendChild(answerInput);
      answerLabel.appendChild(document.createTextNode(answer));
      quizContainer.appendChild(answerLabel);
    });
  }

  function showResult() {
    let correctAnswers = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const totalQuestions = questions.length;
    const score = (correctAnswers / totalQuestions) * 100;

    const resultMessage = `You have completed the quiz!\nYour score: ${score.toFixed(
      2
    )}%`;
    quizContainer.innerHTML = `<h2>${resultMessage}</h2>`;
    nextButton.style.display = "none"; // Hide the next button after showing the result
  }
});
