let activeQuestion = 1;

document.getElementById(`prompt${activeQuestion}`).style.display = "block";
/*"block" means show the block*/
document.getElementById().style.display = "none";
/*"none" means hide the block*/

function hideChoicesAndShowResults(questionNum) {
  document.getElementById(`prompt${questionNum}`).style.display = "block";
  document.getElementById(`choices${questionNum}`).style.display = "none";
  document.getElementById(`results${questionNum}`).style.display = "block";
}

function showChicesAndHideResults(questionNum) {
  document.getElementById(`prompt${questionNum}`).style.display = "block";
  document.getElementById(`choices${questionNum}`).style.display = "block";
  document.getElementById(`results${questionNum}`).style.display = "none";
}

function nextQuestion() {
  activeQuestion += 1;
}

function showQuestion(questionNumber) {
  activeQuestion = questionNumber;
}
