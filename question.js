let activeQuestion = 1;
const questionData = [
  { questionNumber: 1,
    leftResponses: 10,
    rightResponses: 10,
    totalRepsonses: 20
  },
  {
    questionNumber: 2,
    leftResponses: 15,
    rightResponses: 5,
    totalRepsonses: 20
  },
  {
    questionNumber: 3,
    leftResponses: 4,
    rightResponses: 16,
    totalRepsonses: 20
  }
];

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
      if (document.getElementById(`Q${i + 1}`).classList.contains("highlightedProgBox")) {
        document.getElementById(`Q${i + 1}`).classList.remove("highlightedProgBox");
        document.getElementById(`Q${i + 1}`).classList.add("progBox");
      }
    } else {
      question[i].style.display = "block";
      let results = document.getElementById(`chart${activeQuestion}Wrapper`);
      results.style.display = "none";
      if (document.getElementById(`Q${i + 1}`).classList.contains("progBox")) {
        document.getElementById(`Q${i + 1}`).classList.remove("progBox");
        document.getElementById(`Q${i + 1}`).classList.add("highlightedProgBox");
      }
    }
  }
}

function recordResponse(response) {
  console.log(response);
  //send repsone to database
  //retrieve information form database
  //set Data
  setData();
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

document.addEventListener("DOMContentLoaded", function () {
  console.log("triggered");
  onLoad();
});


function setData() {
  const leftResponseHTML = document.getElementById(`left${activeQuestion}Response`);
  const rightResponseHTML = document.getElementById(`right${activeQuestion}Response`);
  let leftNum = 0;
  let rightNum = 0;
  for (let i = 0; i < questionData.length; i++) {
    if (questionData[i].questionNumber === activeQuestion) {
      leftNum = (questionData[i].leftResponses / questionData[i].totalRepsonses) * 100;
      rightNum = (questionData[i].rightResponses / questionData[i].totalRepsonses) * 100;
      break;
    }
  }
  leftResponseHTML.innerText = leftNum + "%";
  rightResponseHTML.innerText = rightNum + "%";
}
