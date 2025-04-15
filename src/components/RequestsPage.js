import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchRequests = async () => {
      const data = await getRequests(token);
      setRequests(data);
    };

    fetchRequests();
  }, [navigate]);

  const handleViewRequest = (id) => {
    navigate(`/requests/${id}`);
  };

  return (
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Список запросов
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.text}</TableCell>
                    <TableCell>
                      <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/requests/${r.id}`)}
                      >
                        Ответить
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
};

export default RequestsPage;
