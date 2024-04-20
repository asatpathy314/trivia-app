import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import OptionChoices from "./OptionChoices";

export default function QuestionBox({ questionObject, questionNumber, setQuestionNumber, userAnswers, setUserAnswers, isSubmitted, setIsSubmitted}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const generateOptionArray = () => {
      let newQuestionArray = questionObject['incorrectAnswers'].map((x) => [x, 0]);
      newQuestionArray.push([questionObject['correctAnswer'], 1]);
      return shuffleArray(newQuestionArray);
    };

    setOptions(generateOptionArray());
  }, [questionNumber, questionObject]);

  const handleQuestionChange = (event, newQuestionNumber) => {
    setQuestionNumber(newQuestionNumber);
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true); // Set the submitted state to true when the submit button is clicked
  };


  return (
    <Box sx={{}}>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#faeee7", width: 500, margin: "auto" }}
      >
        <CardContent sx={{ minHeight: 400 }}>
          <Typography variant="h4" sx={{ color: "#33272a" }} gutterBottom>
            Question {questionNumber}
          </Typography>
          <Typography variant="h5" sx={{ color: "#594a4e", minHeight : 100 }}>
            {questionObject["question"]["text"]}
          </Typography>
          <OptionChoices 
            options={options}
            questionNumber={questionNumber}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        </CardContent>
        <CardActions>
          <Pagination
            count={userAnswers.length}
            page={questionNumber}
            sx={{
              ".MuiPaginationItem-root": { color: "#594a4e" },
              margin: "auto",
            }}
            onChange={handleQuestionChange}
          />
        </CardActions>
        <CardActions>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{
              margin : "auto",
              backgroundColor: '#ff8ba7',
              '&:hover': {
                backgroundColor: "#ffc6c7"  // Change this value to whatever color you want on hover
              }
            }}>
          Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}