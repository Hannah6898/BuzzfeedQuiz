import React from "react";
import OptionsBlock from "./OptionsBlock";

function QuestionsBlock({
  quizItem,
  setChosenAnswerItems,
  chosenAnswerItems,
  unansweredQuestionIds,
  setUnansweredQuestionIds,
}) {
  return (
    <>
      <h2 id={quizItem.id} className="questionsTitle">
        {quizItem.text}
      </h2>
      <div className="questionsContainer">
        {quizItem.options.map((options, _index) => (
          <OptionsBlock
            key={_index}
            options={options}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
            quizItemId={quizItem.id}
          />
        ))}
      </div>
    </>
  );
}

export default QuestionsBlock;
