
import React from 'react'


/*
          <div id="question2Wrapper" class="questionWrap">
            <div id="prompt2" class="prompt">
              <h1>Pineapple on pizza?</h1>
            </div>
            <div class="spacer"></div>
            <div id="changeBoard2">
              <div id="optionWrapper2" class="optionWrapper">
                <div id="prompt2Left" class="leftBTN" onclick="recordResponse('Left', 2)">Yeah!</div>
                <div id="prompt2Right" class="rightBTN" onclick="recordResponse('Right', 2)">NO!</div>
              </div>
              <div id="chart2Wrapper" class="chartWrapper">
                <p>
                  <span id="left2Response" class="LeftResponse">25%</span> Voted
                  for Yeah!
                </p>
                <p>
                  <span id="right2Response" class="RightResponse">75%</span>
                  Voted for NO!
                </p>
                <button class="button" onclick="showNextQuestion()">
                  NEXT
                </button>
              </div>
            </div>
          </div>

*/
function recordResponse(direction, questionNumber) {
    console.log(direction, questionNumber);
    // broadcast event
    //sendMessage(direction, questionNumber);
    //send response to local database and general database
    //updateGlobal(direction, questionNumber);
    //set Data
    //setNewData(direction, questionNumber);
    //display Data
    //displayData();
    //hideChoicesAndShowResults();
  }

export function Question({ questionData }) {

    return (
        <>
        <div className="questionWrap">
            <div className="prompt">
                <h1>${questionData.questionTitle}</h1>
            </div>
            <div className="spacer"></div>
            {questionData.answered === false && (<QuestionButtons leftQuestion={questionData.leftQuestion} rightQuestion={questionData.rightQuestion} questionNumber={questionData.questionNumber}/>)}
        </div>
        </>
    )
}

function QuestionButtons({ leftQuestion, rightQuestion, questionNumber}) {

    return (
        <>
        <div className="optionWrapper">
            <div className="leftBTN" onClick={ () => recordResponse('left', questionNumber)}>${leftQuestion}</div>
            <div className="RightBTN" onClick={ () => recordResponse('right', questionNumber)}>${rightQuestion}</div>
        </div>
        </>
    )
}