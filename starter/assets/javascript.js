document.addEventListener("DOMContentLoaded", () => {
    const questions = [
      {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        question: "Which of the following is a CSS preprocessor?",
        choices: ["Sass", "JavaScript", "HTML"],
        correctAnswer: "Sass"
      },
      {
        question: "What is the purpose of JavaScript?",
        choices: ["Styling web pages", "Creating dynamic content", "Defining document structure"],
        correctAnswer: "Creating dynamic content"
      },
      {
        question: "What is the purpose of JavaScript?",
        choices: ["Styling web pages", "Creating dynamic content", "Defining document structure"],
        correctAnswer: "Creating dynamic content"
      },
    ];
  
    const getElement = (id) => document.getElementById(id);
  
    const startButton = getElement("start");
    const questionContainer = getElement("questions");
    const choicesContainer = getElement("choices");
    const feedbackContainer = getElement("feedback");
    const timerElement = getElement("time");
    const initialsInput = getElement("initials");
    const submitButton = getElement("submit");
    const finalScoreElement = getElement("final-score");
  
    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timerInterval;
  
    const startQuiz = () => {
      getElement("start-screen").classList.add("hide");
      questionContainer.classList.remove("hide");
      displayNextQuestion();
      startTimer();
    };
  
    const displayNextQuestion = () => {
      const currentQuestion = questions[currentQuestionIndex];
      getElement("question-title").textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";
      currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.setAttribute("data-index", index);
        choicesContainer.appendChild(choiceButton);
      });
    };
  
    const handleAnswerClick = (event) => {
      if (event.target.matches("button")) {
        const selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
        const currentQuestion = questions[currentQuestionIndex];
  
        if (currentQuestion.choices[selectedChoiceIndex] === currentQuestion.correctAnswer) {
          feedbackContainer.textContent = "Correct!";
        } else {
          feedbackContainer.textContent = "Incorrect! -10 seconds";
          timeLeft -= 10;
        }
  
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayNextQuestion();
        } else {
          endQuiz();
        }
      }
    };
  
    const endQuiz = () => {
      questionContainer.classList.add("hide");
      getElement("end-screen").classList.remove("hide");
      finalScoreElement.textContent = timeLeft;
      clearInterval(timerInterval);
    };
  
    submitButton.addEventListener("click", () => {
      const initials = initialsInput.value;
      if (initials) {
        const score = timeLeft;
        const newHighScore = { initials, score };
        console.log("New High Score:", newHighScore);
      }
    });
  
    const startTimer = () => {
      timerInterval = setInterval(() => {
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
          endQuiz();
        } else {
          timeLeft--;
        }
      }, 1000);
    };
  
    startButton.addEventListener("click", startQuiz);
    choicesContainer.addEventListener("click", handleAnswerClick);
  });
  