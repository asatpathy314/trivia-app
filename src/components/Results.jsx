import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Results = ({ userAnswers }) => {
  const score = userAnswers.reduce((total, current) => total + (current.isCorrect ? 1 : 0), 0);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ color: "#33272a", textAlign: "center" }}>
        Your Score
      </Typography>
      <Typography variant="h6" sx={{ color: "#594a4e", textAlign: "center" }}>
        {score} out of {userAnswers.length}
      </Typography>
    </Box>
  );
};

export default Results;
