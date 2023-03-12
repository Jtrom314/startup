let activeQuestion = 1;
let questionData = [
  { questionNumber: 1,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0
  },
  {
    questionNumber: 2,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0
  },
  {
    questionNumber: 3,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0
  }
];

async function getResponsesFromService() {
  let questionDataToFill = [];
  try {
    const response = await fetch('/api/responses');
    questionDataToFill = response.json();
    localStorage.setItem('UserReponses', questionDataToFill);
  } catch {
    const getLocalData = localStorage.getItem('UserResponses');
    if (getLocalData) {
      questionDataToFill = JSON.parse(getLocalData)
    }
  }
  updateQuestionDataFromStorage(questionDataToFill);
}

function onLoad() {
  let questions = document.getElementsByClassName(`questionWrap`);
  //get all the elements with class name "questionWrap"
  for (let i = 0; i < questions.length; i++) {
    if (i != activeQuestion - 1) {
      questions[i].style.display = "none";
      if (document.getElementById(`Q${i + 1}`).classList.contains("highlightedProgBox")) {
        document.getElementById(`Q${i + 1}`).classList.remove("highlightedProgBox");
        document.getElementById(`Q${i + 1}`).classList.add("progBox");
      }
    } else {
      questions[i].style.display = "block";
      let results = document.getElementById(`chart${activeQuestion}Wrapper`);
      results.style.display = "none";
      if (document.getElementById(`Q${i + 1}`).classList.contains("progBox")) {
        document.getElementById(`Q${i + 1}`).classList.remove("progBox");
        document.getElementById(`Q${i + 1}`).classList.add("highlightedProgBox");
      }
    }
  }
}

function updateProgBoxes() {}

function updateQuestionDataFromStorage(questionDataToFill) {
  for (const response of questionDataToFill) {
    const questionNum = response.questionNum;
    const direction = response.direction;

    //Set question data
    setNewData(direction, questionNum);
  }
}

function recordResponse(direction, questionNumber) {
  console.log(direction, questionNumber);

  //send response to local database and general database
  updateGlobal(direction, questionNumber);
  //set Data
  setNewData(direction, questionNumber);
  //display Data
  displayData();
  hideChoicesAndShowResults();
}

async function updateGlobal(direction, questionNumber) {
  const userName = localStorage.getItem("userName");
  const newResponse = { 
    name: userName,
    questionNum: questionNumber,
    direction: direction
                      };

  try {
    const response = await fetch('/api/response', {
      method: 'POST',
      headers: { 'content-type' : 'application/json'},
      body: JSON.stringify(newResponse),
    });
    const responses = await response.json();
    localStorage.setItem("UserResponses", JSON.stringify(responses));
  } catch {
    updateLocal(newResponse);
  }
}

function updateLocal(newResponse) {
  let responses = [];
  const allResponses = localStorage.getItem("UserResponses");
  if (allResponses) {
    responses = JSON.parse(allResponses)
  }
  responses.push(newResponse);
  localStorage.setItem('UserResponses', JSON.stringify(responses))
}

function setNewData(direction, questionNum) {
  for (let i = 0; i < questionData.length; i++) {
    if (questionData[i].questionNumber === questionNum) {
      if (direction === "Left") {
        questionData[i].leftResponses += 1;
      } else {
        questionData[i].rightResponses += 1;
      }
      questionData[i].totalRepsonses += 1;
      break;
    }
  }
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


function displayData() {
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

getResponsesFromService();