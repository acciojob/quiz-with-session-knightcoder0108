const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is the capital of England?",
    choices: ["Paris", "London", "Rome", "Madrid"],
    answer: "London"
  },
  {
    question: "What is the capital of Italy?",
    choices: ["Paris", "London", "Rome", "Madrid"],
    answer: "Rome"
  },
  {
    question: "What is the capital of Spain?",
    choices: ["Paris", "London", "Rome", "Madrid"],
    answer: "Madrid"
  },
  {
    question: "What is the capital of Germany?",
    choices: ["Paris", "Berlin", "Rome", "Madrid"],
    answer: "Berlin"
  }
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

function saveProgress() {
  const userAnswers = [];
  questions.forEach((_, i) => {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    userAnswers.push(selectedOption ? selectedOption.value : null);
  });
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

function loadProgress() {
  const storedAnswers = JSON.parse(sessionStorage.getItem("progress"));
  return storedAnswers || Array(questions.length).fill(null);
}

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

questionsElement.addEventListener("change", saveProgress);

submitButton.addEventListener("click", function () {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
});

renderQuestions();

const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your score is ${storedScore} out of ${questions.length}.`;
}