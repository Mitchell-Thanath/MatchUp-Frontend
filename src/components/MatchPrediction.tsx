import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  LinearProgress,
  Divider,
} from '@mui/material';
import { api } from '../services/api';

interface PredictionData {
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  predictions: {
    winner: {
      name: string;
      probability: number;
    };
    scores: {
      home: number;
      away: number;
    };
  };
  statistics: {
    home: {
      form: string;
      att: number;
      def: number;
    };
    away: {
      form: string;
      att: number;
      def: number;
    };
  };
}

interface Props {
  matchId: number;
}

const MatchPrediction: React.FC<Props> = ({ matchId }) => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await api.get(`/sports/predictions/${matchId}`);
        setPrediction(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prediction:', error);
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [matchId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!prediction) {
    return (
      <Typography color="error">
        Unable to load prediction data
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Match Prediction
        </Typography>

        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Predicted Winner: {prediction.predictions.winner.name}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={prediction.predictions.winner.probability} 
            color="primary"
          />
          <Typography variant="caption" color="textSecondary">
            {prediction.predictions.winner.probability}% probability
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Predicted Score
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography>{prediction.teams.home.name}</Typography>
            <Typography variant="h6">{prediction.predictions.scores.home}</Typography>
          </Box>
          <Box>
            <Typography>{prediction.teams.away.name}</Typography>
            <Typography variant="h6">{prediction.predictions.scores.away}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Team Statistics
        </Typography>
        
        <Box mb={2}>
          <Typography>Recent Form</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography>{prediction.statistics.home.form}</Typography>
            <Typography>{prediction.statistics.away.form}</Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography>Attack Strength</Typography>
          <Box display="flex" justifyContent="space-between">
            <LinearProgress 
              variant="determinate" 
              value={prediction.statistics.home.att} 
              sx={{ width: '45%' }}
            />
            <LinearProgress 
              variant="determinate" 
              value={prediction.statistics.away.att} 
              sx={{ width: '45%' }}
            />
          </Box>
        </Box>

        <Box>
          <Typography>Defense Strength</Typography>
          <Box display="flex" justifyContent="space-between">
            <LinearProgress 
              variant="determinate" 
              value={prediction.statistics.home.def} 
              sx={{ width: '45%' }}
            />
            <LinearProgress 
              variant="determinate" 
              value={prediction.statistics.away.def} 
              sx={{ width: '45%' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchPrediction;
