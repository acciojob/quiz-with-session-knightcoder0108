// Initialize DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Function to save progress in session storage
function saveProgress() {
  const userAnswers = [];
  questions.forEach((_, i) => {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    userAnswers.push(selectedOption ? selectedOption.value : null);
  });
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to load progress from session storage
function loadProgress() {
  const storedAnswers = JSON.parse(sessionStorage.getItem("progress"));
  return storedAnswers || Array(questions.length).fill(null);
}

// Function to calculate and display the score
function calculateScore() {
  const userAnswers = loadProgress();
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

// Function to render the quiz questions and choices
function renderQuestions() {
  const userAnswers = loadProgress();
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Event listener for saving progress on option selection
questionsElement.addEventListener("change", saveProgress);

// Event listener for submitting the quiz
submitButton.addEventListener("click", function () {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
});

// Render the quiz questions
renderQuestions();

// Display the score if it exists in local storage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your score is ${storedScore} out of ${questions.length}.`;
}
