var questions = [
  {question: "Commonly used data types do NOT include:",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctanswer: 3},
  {question: "The condition in an if / else statement is enclosed with ________.",
  answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  correctanswer: 2},
  {question: "Arrays in JavaScript can be used to store ________.",
  answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  correctanswer: 4},
  {question: "String values must be enclosed within _______ when being assigned to variables.",
  answers: ["commas", "curly brackets", "quotes", "parenthesis"],
  correctanswer: 3},
  {question: "A very useful tool used during development and debugging for printing content to the debugger is:",
  answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  correctanswer: 4}
]
var timer = 60;
var score = [];

// element declarations
var mainContent = document.querySelector("#page-content");
var timerEl = document.querySelector("#time-limit");
var btnStart = document.querySelector("#start-button");
var pageStart = document.querySelector("#start-page");
var pageQuiz = document.querySelector("#quiz-page");
var pageFinish = document.querySelector("#finish-page");

var questionEl = document.querySelector("#question");
var btnAnswers = [document.querySelector("#answer-1"),document.querySelector("#answer-2"),document.querySelector("#answer-3"),document.querySelector("#answer-4")]
var btnAnswer1 = document.querySelector("#answer-1");
var btnAnswer2 = document.querySelector("#answer-2");
var btnAnswer3 = document.querySelector("#answer-3");
var btnAnswer4 = document.querySelector("#answer-4");

var formEl = document.querySelector("#submission-form");
var finalScoreEl = document.querySelector("#final-score");



var globalCurrentQuestion = -1;
var globalCorrectAnswer = 0;
var globalScore = 0;

pageQuiz.remove();
pageFinish.remove();

//Sound Effect Preload
var sndStart = new Audio('./assets/sounds/start.wav')
sndStart.volume = 0.5
var sndCorrect = new Audio('./assets/sounds/correct.wav')
sndCorrect.volume = 0.5
var sndIncorrect = new Audio('./assets/sounds/incorrect.wav')
sndIncorrect.volume = 0.5
var sndFinish = new Audio('./assets/sounds/finish.wav')
sndFinish.volume = 0.5

var startQuiz = function() {
  console.log("Started the quiz");
  pageStart.remove(); //remove the start page
  timer = 60;
  sndStart.play();
  incrementTimer();
  globalScore = 0;
  mainContent.appendChild(pageQuiz);
  displayQuizQuestion(randomQuestion());
}

var incrementTimer = function() {  
  if (timer > 0){
    timer -= 1;
    timerEl.innerHTML = "Time: "+timer;
    setTimeout(incrementTimer, 1000)
  }
  else
  { //time is UP!
    sndFinish.play();
    pageQuiz.remove();
    mainContent.appendChild(pageFinish);
    finalScoreEl.innerHTML = "Your final score is "+globalScore+"."
  }
}

function randomQuestion() {
  //store the current question number to ensure we don't get the same number in a row
  var cur = globalCurrentQuestion;
  var num = Math.floor(Math.random() * questions.length);
  while(num == cur)
  {
    num = Math.floor(Math.random() * questions.length)
  }
  globalCurrentQuestion = num;    
  return num;
}

var displayQuizQuestion = function(index) {
  questionEl.innerHTML = questions[index].question;  
  //assign the answers
  for(let i=0;i<btnAnswers.length;i++)
  {
    btnAnswers[i].innerHTML = i+1 +". "+ questions[index].answers[i]
  }
  globalCorrectAnswer = questions[index].correctanswer;
}


var answerHandler = function (event) {
  // get target element from event
  var targetEl = event.target;
  if (targetEl.matches(".answer")) {
    var answerID = targetEl.getAttribute("data-answer");
    if (answerID==globalCorrectAnswer)
    {
      console.log("Correct!")
      globalScore += 10
      sndCorrect.currentTime = 0;
      sndCorrect.play();
      displayQuizQuestion(randomQuestion());
    }
    else
    {
      console.log("Incorrect!");
      sndIncorrect.currentTime = 0;
      sndIncorrect.play();
      timer -= 10;
      timerEl.innerHTML = "Time: "+timer;
      showCorrectAnswer();
      setTimeout(resetAnswers, 1000)
    }
  } 
};

var showCorrectAnswer = function () {
  for(let i=0;i<btnAnswers.length;i++)
  {
    if(i==globalCorrectAnswer-1)          
      btnAnswers[i].classList.add("correct");
    else
      btnAnswers[i].classList.add("incorrect");
    
  }
}

var resetAnswers = function () {
  for(let i=0;i<btnAnswers.length;i++)
  {
    btnAnswers[i].classList.remove("correct");
    btnAnswers[i].classList.remove("incorrect");    
  }
}

var submitScoreHandler = function (event) {
  event.preventDefault();
  score.push({
    initials: "",
    score: globalScore
  })
}


btnStart.addEventListener("click", startQuiz);
pageQuiz.addEventListener("click", answerHandler);
formEl.addEventListener("submit", submitScoreHandler);
