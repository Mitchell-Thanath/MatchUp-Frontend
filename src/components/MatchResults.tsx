import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../services/api';

interface Props {
  matchId: string;
}

interface Results {
  match_id: string;
  scores: Record<string, number>;
  winner: string;
}

const MatchResults: React.FC<Props> = ({ matchId }) => {
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await api.getResults(matchId);
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [matchId]);

  if (!results) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography>Loading results...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Match Results
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(results.scores).map(([userId, score]) => (
                <TableRow
                  key={userId}
                  sx={{ backgroundColor: userId === results.winner ? '#e3f2fd' : 'inherit' }}
                >
                  <TableCell>
                    {userId === results.winner ? `${userId} 👑` : userId}
                  </TableCell>
                  <TableCell align="right">{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default MatchResults;
