import { useState, useEffect } from 'react';
import MealForm from './components/MealForm';
import MealList from './components/MealList';
import { getAllMeals, createMeal, updateMeal, deleteMeal } from './services/mealService';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMeals();
      setMeals(data);
    } catch (err) {
      setError('Failed to load meals. Make sure the server is running.');
      console.error('Error fetching meals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeal = async (mealData) => {
    try {
      const newMeal = await createMeal(mealData);
      setMeals([newMeal, ...meals]);
      setEditingMeal(null);
    } catch (err) {
      setError('Failed to create meal');
      console.error('Error creating meal:', err);
    }
  };

  const handleUpdateMeal = async (mealData) => {
    try {
      const updatedMeal = await updateMeal(editingMeal.id, mealData);
      setMeals(meals.map(meal => meal.id === updatedMeal.id ? updatedMeal : meal));
      setEditingMeal(null);
    } catch (err) {
      setError('Failed to update meal');
      console.error('Error updating meal:', err);
    }
  };

  const handleDeleteMeal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) {
      return;
    }
    
    try {
      await deleteMeal(id);
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (err) {
      setError('Failed to delete meal');
      console.error('Error deleting meal:', err);
    }
  };

  const handleEditClick = (meal) => {
    setEditingMeal(meal);
  };

  const handleCancelEdit = () => {
    setEditingMeal(null);
  };

  const handleFormSubmit = (mealData) => {
    if (editingMeal) {
      handleUpdateMeal(mealData);
    } else {
      handleCreateMeal(mealData);
    }
  };

  if (loading) {
    return <div className="loading">Loading meals...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Meal Planner</h1>
        <p>Manage your meals with CRUD operations</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="app-main">
        <section className="form-section">
          <h2>{editingMeal ? 'Edit Meal' : 'Add New Meal'}</h2>
          <MealForm
            meal={editingMeal}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="meals-section">
          <h2>Your Meals ({meals.length})</h2>
          <MealList
            meals={meals}
            onEdit={handleEditClick}
            onDelete={handleDeleteMeal}
          />
        </section>
      </main>
    </div>
  );
}

export default App;