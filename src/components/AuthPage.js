import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../api';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const AuthPage = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateToken(token);
    if (isValid) {
      document.cookie = `token=${token}; path=/`; // Сохранение токена в cookies
      history('/requests'); // Переход на страницу с запросами
    } else {
      setError('Invalid token');
    }
  };

  return (
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Вход по токену
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              label="Введите токен"
              variant="outlined"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
              margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Войти
          </Button>
        </form>
        {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
        )}
      </Box>
  );
};

export default AuthPage;
