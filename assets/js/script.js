//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
  title: "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
  choices: ["Scope", "JSON", "Syntax", "Output"],
  answer: "Syntax"
},
{
  title: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
  choices: ["Scope", "Range", "Output Level", "Restriction"],
  answer: "Scope"
},
{
  title: "In JavaScript, what element is used to store multiple values in a single variable?",
  choices: ["Arrays", "Strings", "Variables", "Functions"],
  answer: "Arrays"
},
{
  title: "What are the identifiers called that cannot be used as variables or function names?",
  choices: ["Constants", "Favorites", "Reserved Words", "Concrete Terms"],
  answer: "Reserved Words"
},
{
  title: "What elements are used to test for TRUE or False values stored in variables?",
  choices: ["Comparison and Logical Operators", "Trigger Readers", " Conditional Statements", "RegExp or Regular Expressions"],
  answer: "Comparison and Logical Operators"
},
{
  title: "What is the default behavior called that is used to move declarations to the top of the current scope?",
  choices: ["Hoisting", "Jumping", "Sorting", "Arranging"],
  answer: "Hoisting"
},
{
  title: "What is considered to be the most popular programming language in the world?",
  choices: ["HTML", "JavaScript", "Swift", "Ruby"],
  answer: "JavaScript"
},
{
  title: "What do you call the guide that defines coding conventions for all projects?",
  choices: ["Style Guide", "Coding Dictionary", "Developer's Reference", "Main Textbook"],
  answer: "Style Guide"
},
{
  title: "In JavaScript, what is a block of code called that is used to perform a specific task?",
  choices: ["String", "Variable", "Declaration", "Function"],
  answer: "Function"
},
{
  title: "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
  choices: ["Recorders", "Variables", "Arrays", "Strings"],
  answer: "Strings"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  //proceed to end the game function when timer is below 0 at any time
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 10 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
  JavaScript Quiz!
</h1>
<h3>
  Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 10;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
  if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}