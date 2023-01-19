import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
import { useState, useEffect } from "react";

function App() {
  const [quiz, setQuiz] = useState(null);
  const [chosenAnswerItems, setChosenAnswerItems] = useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchData = async () => {
    try {
      const reponse = await fetch("http://localhost:8000/quiz");
      const json = await reponse.json();
      setQuiz(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansweredIds = quiz?.questions?.map(({id}) => id);
    setUnansweredQuestionIds(unansweredIds);
  }, [quiz]);


  useEffect(()=> {

    if(unansweredQuestionIds){
      if(unansweredQuestionIds.length<=0 &&chosenAnswerItems.length >=1){
        //scroll to answer block
        setShowAnswer(true)
        const answerBlock = document.getElementById("answer-block")
        answerBlock?.scrollIntoView({behavior:"smooth"})
      }
      //scroll to highest unanweredQuestionId 
      const highestId = Math.min(...unansweredQuestionIds)
      const highestElement = document.getElementById(highestId)
      highestElement?.scrollIntoView({behavior:"smooth"})
    }
  },[unansweredQuestionIds, chosenAnswerItems, showAnswer])

  return (
    <div className="app">
      <Title title={quiz?.title}/>
      {
        quiz?.questions?.map((questionsItem) => (
          <QuestionsBlock
            key={questionsItem.id}
            quizItem={questionsItem}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
          />
        ))}
        {showAnswer &&(<AnswerBlock answerOptions={quiz?.answers} chosenAnswers={chosenAnswerItems}/>)}
    </div>
  );
}

export default App;
