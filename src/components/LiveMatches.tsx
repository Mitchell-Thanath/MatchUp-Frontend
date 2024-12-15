import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from '@mui/material';
import { LiveMatch } from '../types/sports';
import api from '../services/api';

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const data = await api.getLiveMatches();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live matches:', error);
        setLoading(false);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCreatePrediction = (match: LiveMatch) => {
    // Navigate to create prediction page with pre-filled match data
    window.location.href = `/create?matchId=${match.fixture.id}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (matches.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          No Live Matches
        </Typography>
        <Typography color="textSecondary">
          There are currently no live matches available. Please check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Matches
      </Typography>
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.fixture.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography color="textSecondary">
                    {match.league.name}
                  </Typography>
                  <Typography color="error">
                    {match.fixture.status.elapsed}'
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <img 
                      src={match.teams.home.logo} 
                      alt={match.teams.home.name}
                      style={{ width: 30, marginRight: 8 }}
                    />
                    <Typography>{match.teams.home.name}</Typography>
                  </Box>
                  <Typography variant="h6">{match.goals.home}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <img 
                      src={match.teams.away.logo} 
                      alt={match.teams.away.name}
                      style={{ width: 30, marginRight: 8 }}
                    />
                    <Typography>{match.teams.away.name}</Typography>
                  </Box>
                  <Typography variant="h6">{match.goals.away}</Typography>
                </Box>

                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={() => handleCreatePrediction(match)}
                >
                  Create Prediction
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveMatches;
