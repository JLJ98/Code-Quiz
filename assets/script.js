document.addEventListener("DOMContentLoaded", function () {
    // Initialize various elements and game data
  const startButton = document.getElementById("start-button");
  const quizScreen = document.getElementById("quiz-screen");
  const endScreen = document.getElementById("end-screen");
  const timeDisplay = document.getElementById("time");
  const finalScoreDisplay = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitScoreButton = document.getElementById("submit-score");
  const tryAgainButton = document.getElementById("try-again");
  const countdownNumber = document.getElementById("countdown-number");
  const feedbackContainer = document.getElementById("feedback-container");
  const feedbackMessage = document.getElementById("feedback-message"); // Added this line

  // High Scores container and list
  const highScoresContainer = document.getElementById("high-scores-container");
  const highScoresList = document.getElementById("high-scores-list");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Function to save the score
  function saveScore() {
    const initials = initialsInput.value.trim();

    if (initials !== "") {
      const newScore = { initials, score };
      highScores.push(newScore);

      // Sort high scores in descending order
      highScores.sort((a, b) => b.score - a.score);

      // Keep only the top 5 high scores
      highScores.splice(5);

      // Save high scores to localStorage
      localStorage.setItem("highScores", JSON.stringify(highScores));

      alert("Score saved!");
    } else {
      alert("Please enter your initials.");
    }
  }

  function displayHighScores() {
    // Clear previous high scores
    highScoresList.innerHTML = "";

    // Display high scores in the list
    highScores.forEach((score, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
      highScoresList.appendChild(li);
    });

    // Show the high scores container
    highScoresContainer.classList.remove("hidden");
  }
// initialize game data
  let timer;
  let timeLeft = 60; // Initial time in seconds
  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [

    {
      question: "What are the primitive data types in JavaScript?",
      choices: ["Strings, Numbers, Booleans, Objects, Null, Undefined", "Integers, Floats, Characters, Booleans, Null, Undefined", "Strings, Numbers, Booleans, Null, Undefined, Symbols", "Text, Integer, Boolean, None, Empty, Undefined"],
      correctAnswer: "Strings, Numbers, Booleans, Null, Undefined, Symbols"
    },
    {
      question: "What is the difference between == and === in JavaScript?",
      choices: ["== is used for assignment, === is used for comparison", "== is used for comparison, === is used for assignment", "== is used for comparison, === is used for strict comparison", "== is used for strict comparison, === is used for comparison"],
      correctAnswer: "== is used for comparison, === is used for strict comparison"
    },
    {
      question: "What is the difference between let and var in JavaScript?",
      choices: ["let is used for block scope, var is used for global scope", "let is used for global scope, var is used for block scope", "let is used for block scope, var is used for function scope", "let is used for function scope, var is used for block scope"],
      correctAnswer: "let is used for block scope, var is used for function scope"
    },
    {
      question: "What is useful for storing multiple values in a single variable?",
      choices: ["Array", "String", "Boolean", "Object"],
      correctAnswer: "Array"
    },
    {
      question: "What is the difference between a function declaration and a function expression?",
      choices: ["Function declarations are hoisted, function expressions are not", "Function expressions are hoisted, function declarations are not", "Function declarations are hoisted, function expressions are not", "Function expressions are hoisted, function declarations are not"],
      correctAnswer: "Function declarations are hoisted, function expressions are not"
    }
  ];

  startButton.addEventListener("click", startQuiz);
  submitScoreButton.addEventListener("click", saveScore);
  tryAgainButton.addEventListener("click", resetGame);

// start quiz function
  function startQuiz() {
    startButton.parentElement.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    displayQuestion();
    startTimer();
  }
// display question function
  function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");

    const currentQuestion = questions[currentQuestionIndex];

    question.textContent = currentQuestion.question;
    choices.innerHTML = "";

    currentQuestion.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => checkAnswer(choice));
      choices.appendChild(li);
    });
  }
// show feedback function
  function showFeedback(isCorrect) {
    feedbackMessage.textContent = isCorrect ? "Correct!" : "Wrong!";
    feedbackContainer.classList.remove("hidden");

    // Hide feedback after a short delay
    setTimeout(() => {
      feedbackContainer.classList.add("hidden");
    }, 1000);
  }
// check answer function
  function checkAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];

    if (choice === currentQuestion.correctAnswer) {
      score++;
      showFeedback(true); // Display "Correct!" feedback
    } else {
      timeLeft -= 10; // Subtract 10 seconds for incorrect answer
      showFeedback(false); // Display "Wrong!" feedback
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }
// start timer function
  function startTimer() {
    timer = setInterval(function () {
      timeLeft--;

      if (timeLeft <= 0) {
        endGame();
      } else {
        timeDisplay.textContent = timeLeft;
      }
    }, 1000);
  }
// end game function
  function endGame() {
    clearInterval(timer);
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreDisplay.textContent = score;
    const countdownNumber = document.getElementById("countdown-number");
    displayHighScores(); // Show high scores when the game ends
  }
// reset game function
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    displayQuestion();

    // Clear existing timer if any
    clearInterval(timer);

    // Reset timer variable to null
    timer = null;

    // Start a new timer
    startTimer();
    endScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    // Ensure highScoresContainer is hidden on Try Again
    highScoresContainer.classList.add("hidden");
  }
});
