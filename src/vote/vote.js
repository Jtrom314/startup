import React from 'react'
import { Question } from './question'
import { Notification } from './websocket';


const userName = React.useState(localStorage.getItem('userName'))
const maxNumberOfQuestions = 3;


let activeQuestion = 1;
let questionData = [
  { 
    questionNumber: 1,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "",
    questionLeft: "",
    questionRight: "",
    answered: false
  },
  {
    questionNumber: 2,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "",
    questionLeft: "",
    questionRight: "",
    answered: false
  },
  {
    questionNumber: 3,
    leftResponses: 0,
    rightResponses: 0,
    totalRepsonses: 0,
    questionTitle: "",
    questionLeft: "",
    questionRight: "",
    answered: false
  }
];


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
      //setNewData(direction, questionNum);
    }
  }

export function Vote () {
    <>
        <section id="player-messages"></section>
        <section>
            { activeQuestion === 1 && (<Question questionPackage={questionData[0]}></Question>)}
            { activeQuestion === 2 && (<Question questionPackage={questionData[1]}></Question>)}
            { activeQuestion === 3 && (<Question questionPackage={questionData[2]}></Question>)}
        </section>
        <section></section>
    </>
}