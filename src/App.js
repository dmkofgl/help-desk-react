import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import RequestsPage from './components/RequestsPage';
import RequestDetailPage from './components/RequestDetailPage';
import { CssBaseline, Container } from '@mui/material';

const App = () => (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
        </Routes>
      </Container>
    </Router>
);

export default App;
