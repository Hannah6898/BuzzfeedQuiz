import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
import { useState, useEffect } from "react";

function App() {
  const [quiz, setQuiz] = useState(false);
  const [chosenAnswerItems, setChosenAnswerItems] = useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState(null);

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

  console.log(unansweredQuestionIds)
console.log("hi")
  useEffect(() => {
    const unansweredIds = quiz && quiz?.questions?.map(({id}) => id);
    console.log(unansweredIds)
    setUnansweredQuestionIds(unansweredIds);
  }, [quiz]);


  useEffect(()=> {

    if(unansweredQuestionIds){
      if(unansweredQuestionIds.length<=0 &&chosenAnswerItems.length >=1){
        //scroll to answer block
      }
      //scroll to highest unanweredQuestionId 
      const highestId = Math.min(...unansweredQuestionIds)
      const highestElement = document.getElementById(highestId)
      highestElement?.scrollIntoView({behavior:"smooth"})
    }
  },[unansweredQuestionIds, chosenAnswerItems])

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz &&
        quiz?.questions.map((questionsItem) => (
          <QuestionsBlock
            key={questionsItem.id}
            quizItem={questionsItem}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
          />
        ))}
    </div>
  );
}

export default App;
