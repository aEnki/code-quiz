var questions = [
  {question: "Commonly used data types do NOT include:",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctanswer: 3},
  {question: "The condition in an if / else statement is enclosed with ________.",
  answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  correctanswer: 2}
]

var timer = 60;

// element declarations
var mainContent = document.querySelector("#page-content");
var timerEl = document.querySelector("#time-limit");
var btnStart = document.querySelector("#start-button");
var pageStart = document.querySelector("#start-page");
var pageQuiz = document.querySelector("#quiz-page");
var questionEl = document.querySelector("#question");
var btnAnswers = [document.querySelector("#answer-1"),document.querySelector("#answer-2"),document.querySelector("#answer-3"),document.querySelector("#answer-4")]
var btnAnswer1 = document.querySelector("#answer-1");
var btnAnswer2 = document.querySelector("#answer-2");
var btnAnswer3 = document.querySelector("#answer-3");
var btnAnswer4 = document.querySelector("#answer-4");

var globalCorrectAnswer = 0;

pageQuiz.remove();

var startQuiz = function() {
  console.log("Started the quiz");
  pageStart.remove(); //remove the start page
  timer = 60;
  incrementTimer();
  mainContent.appendChild(pageQuiz);
  displayQuizQuestion(randomQuestion);
}

var incrementTimer = function() {  
  if (timer > 0){
    timer -= 1;
    timerEl.innerHTML = "Time: "+timer;
    setTimeout(incrementTimer, 1000)
  }
}

var randomQuestion = function() {
  console.log(questions.length)
  return Math.floor(Math.random() * questions.length) + 1;
}

var displayQuizQuestion = function(index) {
  questionEl.innerHTML = questions[index].question;  
  //assign the answers
  for(let i=0;i<btnAnswers.length;i++)
  {
    btnAnswers[i].innerHTML = questions[index].answers[i]
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
    }
    else
    {
      console.log("Incorrect!")
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

btnStart.addEventListener("click", startQuiz);
pageQuiz.addEventListener("click", answerHandler);
