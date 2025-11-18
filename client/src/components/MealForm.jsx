import { useState, useEffect } from 'react';

function MealForm({ meal, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    description: '',
    meal_time: '',
  });

  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || '',
        calories: meal.calories || '',
        description: meal.description || '',
        meal_time: meal.meal_time || '',
      });
    }
  }, [meal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mealData = {
      name: formData.name,
      calories: formData.calories ? parseInt(formData.calories) : null,
      description: formData.description || null,
      meal_time: formData.meal_time || null,
    };
    onSubmit(mealData);
  };

  return (
    <form onSubmit={handleSubmit} className="meal-form">
      <div className="form-group">
        <label htmlFor="name">Meal Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Grilled Chicken"
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          placeholder="e.g., 350"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add a description..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="meal_time">Meal Time</label>
        <select
          id="meal_time"
          name="meal_time"
          value={formData.meal_time}
          onChange={handleChange}
        >
          <option value="">Select meal time</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {meal ? 'Update Meal' : 'Add Meal'}
        </button>
        {meal && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default MealForm;