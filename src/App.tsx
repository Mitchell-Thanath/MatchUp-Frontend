import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, createTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateMatch from './components/CreateMatch';
import JoinMatch from './components/JoinMatch';
import MatchResults from './components/MatchResults';
import LiveMatches from './components/LiveMatches';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Sports Prediction App
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            <Toolbar />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/live">
                <ListItemIcon><SportsSoccerIcon /></ListItemIcon>
                <ListItemText primary="Live Matches" />
              </ListItem>
              <ListItem button component={Link} to="/create">
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Create Match" />
              </ListItem>
              <ListItem button component={Link} to="/join">
                <ListItemIcon><GroupAddIcon /></ListItemIcon>
                <ListItemText primary="Join Match" />
              </ListItem>
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<LiveMatches />} />
            <Route path="/live" element={<LiveMatches />} />
            <Route path="/create" element={<CreateMatch />} />
            <Route path="/join" element={<JoinMatch />} />
            <Route path="/results/:matchId" element={<MatchResults />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
