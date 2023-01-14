import Title from './components/Title';
import QuestionBlock from './components/QuestionBlock'
import QuestionsBlock from "./components/QuestionsBlock"
import AnswerBlock from "./components/AnswerBlock"
import {useState, useEffect} from 'react'


function App() {
  const [quiz,setQuiz] = useState(false)

  const fetchData = async()=>{
    try{
      const reponse = await fetch('http://localhost:8000/quiz')
      const json = await reponse.json()
      console.log(json)
      setQuiz(json)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div >
      <Title/>

    </div>
  );
}

export default App;
