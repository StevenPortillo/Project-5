import axios from 'axios';
import API_URL from '../config/api.js';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllMeals = async () => {
  const response = await api.get('/meals');
  return response.data;
};

export const getMealById = async (id) => {
  const response = await api.get(`/meals/${id}`);
  return response.data;
};

export const createMeal = async (mealData) => {
  const response = await api.post('/meals', mealData);
  return response.data;
};

export const updateMeal = async (id, mealData) => {
  const response = await api.put(`/meals/${id}`, mealData);
  return response.data;
};

export const deleteMeal = async (id) => {
  const response = await api.delete(`/meals/${id}`);
  return response.data;
};