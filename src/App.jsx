import './App.css';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import QuestionBox from './components/QuestionBox';
import Results from './components/Results';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


function App() {
  // declare a state variable for trivia questions
  const [questions, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [userAnswers, setUserAnswers] = useState(Array(numberOfQuestions).fill({'choice' : -1, 'isCorrect' : 0}));

  const initializeQuiz = async () => {
    try {
      const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=${numberOfQuestions+1}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const triviaObject = await response.json();
      setQuestions(triviaObject);
      setUserAnswers(Array(numberOfQuestions).fill({'choice': -1, 'isCorrect': 0}));
      setQuestionNumber(1);
      setIsSubmitted(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  useEffect(() => {
    initializeQuiz();
  }, [numberOfQuestions]);
  // debugging
  
  useEffect(() => {
    if (questions) {
      console.log(questions);
    }
  }, [questions]);


  const handleReset = () => {
    initializeQuiz(); // Resets and re-fetches data
  };

  return (
    <>
      <Typography variant="h1" sx={{typography: { sm: 'h2', xs: 'h3' }}}gutterBottom>
        Let&apos;s play Trivia!
      </Typography>
      <div className="questionBox">
        {/* Conditional rendering to check if questions have been loaded */}
        {questions ? (
          <QuestionBox 
          questionObject={questions[questionNumber]} 
          questionNumber={questionNumber} 
          setQuestionNumber={setQuestionNumber} 
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}/>
        ) : (
          <Typography variant="h6">Loading questions...</Typography>
        )}
      </div>
      <div>
  {isSubmitted ? 
  <>
    <Results userAnswers={userAnswers}/> 
    <Button 
      onClick={handleReset}
      variant="contained"
      sx={{
        margin: 'auto',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: '#AFD8B5',
        '&:hover': {
          backgroundColor: "#c3f0ca"
        }
      }}
    >
      Restart
    </Button>
  </>
  : 
  null
  }
</div>
  </>
);
}

export default App;