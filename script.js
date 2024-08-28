// Initialize DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Function to save progress in session storage
function saveProgress() {
  const userAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(
      `input[name="question-${i}"]:checked`
    );
    if (selectedOption) {
      userAnswers.push(selectedOption.value);
    } else {
      userAnswers.push(null);
    }
  }
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to load progress from session storage
function loadProgress() {
  const storedAnswers = JSON.parse(sessionStorage.getItem("progress"));
  return storedAnswers || [];
}

// Function to calculate and display the score
function calculateScore() {
  const userAnswers = loadProgress();
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Function to render the quiz questions and choices
function renderQuestions() {
  const userAnswers = loadProgress();
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Event listener for saving progress on option selection
questionsElement.addEventListener("change", saveProgress);

// Event listener for submitting the quiz
submitButton.addEventListener("click", function () {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.innerText = `Your score is ${score} out of 5.`;
});

// Render the quiz questions
renderQuestions();

// Check if a score is already stored in local storage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your score is ${storedScore} out of 5.`;
}
