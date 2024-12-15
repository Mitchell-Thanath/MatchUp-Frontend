import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Match {
  match_id: string;
  host_id: string;
  type: string;
  buy_in: number;
  invite_code: string;
  questions: string[];
  participants: string[];
  status: string;
  winner?: string;
}

export interface Prediction {
  user_id: string;
  predictions: Record<string, string>;
}

const apiService = {
  // Create a new match
  createMatch: async (hostId: string, type: string, buyIn: number, questions: string[]) => {
    const response = await api.post('/matches', {
      host_id: hostId,
      type,
      buy_in: buyIn,
      questions,
    });
    return response.data;
  },

  // Join a match
  joinMatch: async (inviteCode: string, userId: string) => {
    const response = await api.post(`/matches/${inviteCode}/join`, {
      user_id: userId,
    });
    return response.data;
  },

  // Submit predictions
  submitPredictions: async (matchId: string, userId: string, predictions: Record<string, string>) => {
    const response = await api.post(`/matches/${matchId}/predictions`, {
      user_id: userId,
      predictions,
    });
    return response.data;
  },

  // Get match results
  getResults: async (matchId: string) => {
    const response = await api.get(`/matches/${matchId}/results`);
    return response.data;
  },

  // Get live matches
  getLiveMatches: async () => {
    const response = await api.get('/sports/live-matches');
    return response.data;
  },

  // Get match prediction
  getPrediction: async (fixtureId: number) => {
    const response = await api.get(`/sports/predictions/${fixtureId}`);
    return response.data;
  },

  // Get team stats
  getTeamStats: async (teamId: number) => {
    const response = await api.get(`/sports/team-stats/${teamId}`);
    return response.data;
  }
};

export { api, apiService as default };
