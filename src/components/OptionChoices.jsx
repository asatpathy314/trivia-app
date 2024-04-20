import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';

export default function OptionChoices({ options, questionNumber, userAnswers, setUserAnswers }) {
  const [value, setValue] = useState(userAnswers[questionNumber - 1]['choice'] === -1 ? '' : userAnswers[questionNumber - 1]['choice']);

  useEffect(() => {
    setValue(userAnswers[questionNumber - 1]['choice'] === -1 ? '' : userAnswers[questionNumber - 1]['choice']);
  }, [questionNumber, userAnswers]);

  const handleRadioChange = (event) => {
    const newValue = parseInt(event.target.value);
    const isCorrect = options[newValue - 1][1] === 1; // Assuming the second element indicates correctness

    // Create a new array with updated values for the current question
    const updatedUserAnswers = userAnswers.map((answer, index) => {
      if (index === questionNumber - 1) {
        return { ...answer, choice: newValue, isCorrect: isCorrect };
      }
      return answer;
    });

    setUserAnswers(updatedUserAnswers);
    setValue(newValue.toString());
  };

  const basicHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash;
  };

  return (
    <form>
      <FormControl sx={{ m: 3 }} variant="standard">
      <RadioGroup
            name="quiz"
            value={value}
            onChange={handleRadioChange}
            sx={{
              '& .MuiRadio-root': { color: '#ff8ba7' }, // default color
              '& .MuiRadio-root.Mui-checked': { color: '#ff8ba7' }, // color when checked
            }}
          >
          {options.map((option, index) => (
            <FormControlLabel key={basicHash(option[0])*index} value={(index + 1).toString()} control={<Radio />} label={option[0]} />
          ))}
        </RadioGroup>
      </FormControl>
    </form>
  );
}
