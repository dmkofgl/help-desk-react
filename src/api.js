import axios from 'axios';
import {API_BASE_URL} from './constants'

// const API_URL = 'http://127.0.0.1:8080'; // Замените на URL вашего бэкенда

// Функция для проверки токена
export const validateToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate-token`, {},
        {
          headers: {Authorization: `Bearer ${token}`},
        });
    return response.data.valid; // Если токен валидный, возвращаем true
  } catch (error) {
    console.error('Token validation failed', error);
    return false;
  }
};

// Функция для получения списка запросов
export const getRequests = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/requests`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data; // Список запросов
  } catch (error) {
    console.error('Failed to fetch requests', error);
    return [];
  }
};

// Функция для получения запрос
export const getRequest = async (token, id) => {
  try {

    const response = await axios.get(`${API_BASE_URL}/request/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data; // Список запросов
  } catch (error) {
    console.error('Failed to fetch requests', error);
    return [];
  }
};

// Функция для отправки ответа на запрос
export const respondToRequest = async (token, requestId, responseText) => {
  try {
    await axios.post(
        `${API_BASE_URL}/respond`,
        {requestId, responseText},
        {headers: {Authorization: `Bearer ${token}`}}
    );
  } catch (error) {
    console.error('Failed to respond to request', error);
  }
};
