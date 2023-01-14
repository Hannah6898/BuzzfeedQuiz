import React from "react";

function OptionsBlock({ options, setChosenAnswerItems, chosenAnswerItems, unansweredQuestionIds, setUnansweredQuestionIds, quizItemId}) {

  //Options chosen by the user is added to an array
  //The question has now been answered so the ID will be removed from the unanswered question id state
  const handleClick= ()=>{
    setChosenAnswerItems((prevState)=>[...prevState, options.text])
    setUnansweredQuestionIds(unansweredQuestionIds.filter((id)=>id!= quizItemId))
  }

  //If the option for the question has not been chosen by the user and the question has already been answered then disable 
  const validPick = !chosenAnswerItems?.includes(options.text) && !unansweredQuestionIds?.includes(quizItemId)

  return (
    <button className="option-block"
    onClick={handleClick}
    disabled={validPick}
    >
      <img src={options.image} alt={options.alt}></img>
      <h3>{options.text}</h3>
      <p>
        <a href={options.image}>{options.credit}</a>
        <a href="unslash">Unsplash</a>
      </p>
    </button>
  );
}

export default OptionsBlock;
