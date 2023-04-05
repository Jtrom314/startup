import React from 'react'
import { Question } from './question'
import { Notification } from './websocket';
import { Players } from './eventData';
import { useState } from 'react'


const maxNumberOfQuestions = 3;


let activeQuestion = 1;

function getCurrentQuestion() {
  return activeQuestion
}

let questionData = [
  { 
    questionNumber: 1,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "Pineapple on Pizza?",
    questionLeft: "Yes",
    questionRight: "No",
    answered: false
  },
  {
    questionNumber: 2,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "Question 2",
    questionLeft: "Left",
    questionRight: "Right",
    answered: false
  },
  {
    questionNumber: 3,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "Question 3",
    questionLeft: "Left",
    questionRight: "Right",
    answered: false
  }
];

function recordResponse(direction, questionNumber, hasAnswered) {
  console.log(direction, questionNumber, hasAnswered);
  // broadcast event
  //sendMessage(direction, questionNumber);
  //send response to local database and general database
  updateGlobal(direction, questionNumber, hasAnswered);
  //set Data
  setNewData(direction, questionNumber, hasAnswered);
  //display Data
  //displayData();
  //hideChoicesAndShowResults();
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



async function getResponsesFromService() {
  let questionDataToFill = [];
  try {
    const response = await fetch('/api/responses');
    questionDataToFill = await response.json();
    localStorage.setItem('UserReponses', questionDataToFill);
  } catch {
    const getLocalData = localStorage.getItem('UserResponses');
    if (getLocalData) {
      questionDataToFill = JSON.parse(getLocalData)
    }
  }
  updateQuestionDataFromStorage(questionDataToFill);
}

function updateQuestionDataFromStorage(questionDataToFill) {
    for (const response of questionDataToFill) {
      const questionNum = response.questionNum;
      const direction = response.direction;
  
      //Set question data
      setNewData(direction, questionNum);
    }
  }

  function setNewData(direction, questionNum, hasAnswered=false) {
    for (let i = 0; i < questionData.length; i++) {
      if (questionData[i].questionNumber === questionNum) {
        questionData[i].answered = hasAnswered;
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

function Vote ({userName}) {
    getResponsesFromService()
  const QUESTION_STATE = {
    question1: 1,
    question2: 2,
    question3: 3
  }
const [currentQuestion, setCurrentQuestion] = useState(QUESTION_STATE.question1)
    const childToParent1 = (childData) => {
      console.log('childToParent1')
      let direction = childData.response
      let questionNumber = childData.qNumber
      let answer = childData.answered
      recordResponse(direction, questionNumber, answer)

    }
    const childToParent2 = () => {
      if (currentQuestion === 1) {
          setCurrentQuestion( QUESTION_STATE.question2)
        } else if (currentQuestion === 2) {
          setCurrentQuestion(QUESTION_STATE.question3)
        }
      }
    return (
    <>
        <section>
            <Players userName={userName} />
        </section>
        <section>
            { currentQuestion === 1 && (<Question childToParent1={childToParent1} childToParent2={childToParent2} questionPackage={questionData[0]}></Question>)}
            { currentQuestion === 2 && (<Question childToParent1={childToParent1} childToParent2={childToParent2} questionPackage={questionData[1]}></Question>)}
            { currentQuestion === 3 && (<Question childToParent1={childToParent1} childToParent2={childToParent2} questionPackage={questionData[2]}></Question>)}
        </section>
        <section></section>
    </>
    )
}




export { Vote }