import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import api from '../services/api';

const CreateMatch: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>(['']);
  const [buyIn, setBuyIn] = useState<number>(0);
  const [matchType, setMatchType] = useState<string>('group');

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Using a mock user ID for now
      const result = await api.createMatch('user123', matchType, buyIn, questions.filter(q => q.trim() !== ''));
      console.log('Match created:', result);
      // Handle success (e.g., show invite code, redirect)
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Match
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Buy-in Amount"
            type="number"
            value={buyIn}
            onChange={(e) => setBuyIn(Number(e.target.value))}
            margin="normal"
          />
          
          {questions.map((question, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              margin="normal"
            />
          ))}
          
          <Button
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ mt: 2, mb: 2 }}
          >
            Add Question
          </Button>
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Create Match
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateMatch;
