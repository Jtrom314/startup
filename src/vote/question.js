
import React from 'react'
import { useState } from 'react'




export function Question({ childToParent1, childToParent2, questionPackage }) {
    const [hasAnswered, setHasAnswered] = useState(false)
    const childToParent3 = () => {
        setHasAnswered(!hasAnswered);
    }
    const [resultObject, setResult] = useState('')
    const childToParent4 = (results) => {
        setResult(results)
    }
    return (
        <>
        <div className="questionWrap">
            <div className="prompt">
                <h1>{questionPackage.questionTitle}</h1>
            </div>
            <div className="spacer"></div>
            {!hasAnswered && (<QuestionButtons childToParent4={childToParent4} childToParent3={childToParent3}leftQuestion={questionPackage.questionLeft} rightQuestion={questionPackage.questionRight} questionNumber={questionPackage.questionNumber}/>)}
            {hasAnswered && (<Results childToParent1={childToParent1} childToParent2={childToParent2} questionInfo={questionPackage} resultObject={resultObject}/>)}
        </div>
        </>
    )
}

function QuestionButtons({ childToParent4, childToParent3, leftQuestion, rightQuestion, questionNumber}) {
    console.log(leftQuestion)
    console.log(rightQuestion)

    let leftPackage = {
      response: 'left',
      qNumber: questionNumber,
      answered: true
    }

    let rightPackage = {
      response: 'right',
      qNumber: questionNumber,
      answered: true
    }


    return (
        <>
        <div className="optionWrapper">
            <div className="leftBTN" onClick={ () => {childToParent4(leftPackage); childToParent3()} }>{leftQuestion}</div>
            <div className="rightBTN" onClick={ () => {childToParent4(rightPackage); childToParent3()}}>{rightQuestion}</div>
        </div>
        </>
    )
}

function Results ({childToParent1, childToParent2, questionInfo, resultObject}) {
  let leftResult, rightResult = 0;
  console.log(questionInfo.leftQuestion)
  console.log(questionInfo.rightQuestion)
  console.log(questionInfo.totalRepsonses)
  if (resultObject.response === 'left') {
   leftResult = (questionInfo.leftResponses + 1) / (questionInfo.totalRepsonses + 1) * 100
   rightResult = questionInfo.rightResponses / (questionInfo.totalRepsonses + 1) * 100
   
  } else {
    leftResult = questionInfo.leftResponses / (questionInfo.totalRepsonses + 1) * 100
    rightResult = (questionInfo.rightResponses + 1) / (questionInfo.totalRepsonses + 1) * 100
  }
  leftResult = leftResult.toFixed(2)
   rightResult = rightResult.toFixed(2)

  return (
    <>
    <div className='chartWrapper'>
      <p><span className="LeftResponse">{leftResult}%</span> Voted for {questionInfo.questionRight}</p>
      <p><span className="RightResponse">{rightResult}%</span> Voted for {questionInfo.questionLeft}</p>
      <button className="button" onClick={()=> {childToParent1(resultObject); childToParent2()}}>NEXT</button>
    </div>
    </>
  )
}
