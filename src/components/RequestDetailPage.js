import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {respondToRequest, getRequest} from '../api';

import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';

const RequestDetailPage = () => {
  const {id} = useParams();
  const [response, setResponse] = useState('');
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.replace(
        /(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, '$1');
    if (!token) {
      return navigate('/');
    }

    const fetchRequests = async () => {
      const data = await getRequest(token, id);
      setRequest(data);
    };
    fetchRequests();
  }, [id, navigate]);

  const handleSubmit = async () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (!token) {
      return navigate('/');
    }

    try {
      await respondToRequest(token, id, response)
      navigate('/requests');
    } catch (err) {
      console.error(err);
      alert('Ошибка при отправке ответа');
    }
  };
  if (!request) {
    return <div>Loading...</div>;
  }

  return (
      <Box mt={5} component={Paper} p={3}>
        <Typography variant="h5" gutterBottom>
          Запрос #{request.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {request.text}
        </Typography>
        <TextField
            label="Ваш ответ"
            multiline
            fullWidth
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            margin="normal"
        />
        <Box display="flex" gap={2} mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Отправить
          </Button>
          <Button variant="outlined" onClick={() => navigate('/requests')}>
            Вернуться к списку
          </Button>
        </Box>
      </Box>
  );
};

export default RequestDetailPage;
