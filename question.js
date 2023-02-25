
let activeQuestion = 1;

//document.getElementById(`question${activeQuestion}Wrapper`).style.display = "block";
/*"block" means show the block*/
//document.getElementById().style.display = "none";
/*"none" means hide the block*/

function onLoad() {
  let question = document.getElementsByClassName(`questionWrap`);
  //get all the elements with class name "questionWrap"
  for (let i = 0; i < question.length; i++) {
    if (i != activeQuestion - 1) {
      question[i].style.display = "none";
    } else {
      question[i].style.display = "block";
      let results = document.getElementById(`chart${activeQuestion}Wrapper`)
      results.style.display = "none";
    }
  }
}

function recordResponse(response) {
  console.log(response);
  //send repsone to database
  //retrieve information form database
  hideChoicesAndShowResults();
}

function hideChoicesAndShowResults() {
  let question = document.getElementById(`optionWrapper${activeQuestion}`);
  let results = document.getElementById(`chart${activeQuestion}Wrapper`);
  question.style.display = "none";
  results.style.display = "flex";
}


function showQuestion(questionNumber) {
  activeQuestion = questionNumber;
  onLoad();
}

function showNextQuestion() {
  activeQuestion += 1;
  onLoad();
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("triggered");
  onLoad();
});
