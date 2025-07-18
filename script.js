const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is Web Development Fun?",
    answers: [
      { text: "kinda", correct: false },
      { text: "YES!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "Who is the best Youtuber?",
    answers: [
      { text: "Web Dev Simplified", correct: true },
      { text: "Traversy Media", correct: true },
      { text: "Dev Ed", correct: true },
      { text: "Fun Fun Function", correct: true },
    ],
  },
  {
    question: "What is 4 x 2?",
    answers: [
      { text: "8", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Does Pineapple Belong on Pizza?",
    answers: [
      { text: "yes", correct: true },
      { text: "no", correct: false },
    ],
  },
  {
    question: "What Is The Capitol of Alaska?",
    answers: [
      { text: "Wasilla", correct: false },
      { text: "Anchorage", correct: false },
      { text: "Juneau", correct: true },
      { text: "Sitka", correct: false },
    ],
  },
  {
    question: "What is 13 x 379?",
    answers: [
      { text: "4927", correct: true },
      { text: "5023", correct: false },
      { text: "4567", correct: false },
      { text: "5877", correct: false },
    ],
  },
];
