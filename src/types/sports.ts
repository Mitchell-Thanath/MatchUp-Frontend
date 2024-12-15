export interface LiveMatch {
  fixture: {
    id: number;
    date: string;
    status: { elapsed: number; long: string };
    venue: { name: string; city: string };
  };
  league: {
    name: string;
    country: string;
  };
  teams: {
    home: { id: number; name: string; logo: string };
    away: { id: number; name: string; logo: string };
  };
  goals: {
    home: number;
    away: number;
  };
}
