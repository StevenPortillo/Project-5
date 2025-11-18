function MealCard({ meal, onEdit, onDelete }) {
    return (
      <div className="meal-card">
        <div className="meal-header">
          <h3>{meal.name}</h3>
          {meal.meal_time && (
            <span className="meal-time-badge">{meal.meal_time}</span>
          )}
        </div>
        
        {meal.calories && (
          <p className="meal-calories">{meal.calories} calories</p>
        )}
        
        {meal.description && (
          <p className="meal-description">{meal.description}</p>
        )}
        
        <div className="meal-actions">
          <button onClick={() => onEdit(meal)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(meal.id)} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default MealCard;