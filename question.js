
let activeQuestion = 1;

document.getElementById(`question${activeQuestion}Wrapper`).style.display = "block";
/*"block" means show the block*/
document.getElementById().style.display = "none";
/*"none" means hide the block*/

function onLoad() {
  let prompts = document.getElementsByClassName(`questionWrap`);
  //get all the elements with class name "questionWrap"
  for (let i = 0; i < prompts.length; i++) {
    if (i != activeQuestion - 1) {
      prompts[i].style.display = "none";
    } else {
      prompts[i].style.display = "block";
    }
  }
}

function hideChoicesAndShowResults() {
  document.getElementById(`question${activeQuestion}`).style.display = "block";
  document.getElementById(`choices${activeQuestion}`).style.display = "none";
  document.getElementById(`results${activeQuestion}`).style.display = "block";
}

function showChicesAndHideResults() {
  document.getElementById(`question${activeQuestion}`).style.display = "block";
  document.getElementById(`choices${activeQuestion}`).style.display = "block";
  document.getElementById(`results${activeQuestion}`).style.display = "none";
}

function showQuestion(questionNumber) {
  activeQuestion = questionNumber;
  onload();
}

function showNextQuestion() {
  activeQuestion += 1;
  onload();
}
