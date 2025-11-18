const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllMeals = async () => {
  const response = await fetch(`${API_URL}/meals`);
  if (!response.ok) throw new Error('Failed to fetch meals');
  return response.json();
};

export const createMeal = async (mealData) => {
  const response = await fetch(`${API_URL}/meals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mealData),
  });
  if (!response.ok) throw new Error('Failed to create meal');
  return response.json();
};

export const updateMeal = async (id, mealData) => {
  const response = await fetch(`${API_URL}/meals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mealData),
  });
  if (!response.ok) throw new Error('Failed to update meal');
  return response.json();
};

export const deleteMeal = async (id) => {
  const response = await fetch(`${API_URL}/meals/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete meal');
  return response.json();
};