import MealCard from './MealCard';

function MealList({ meals, onEdit, onDelete }) {
  if (meals.length === 0) {
    return (
      <div className="empty-state">
        <p>No meals yet. Add your first meal!</p>
      </div>
    );
  }

  return (
    <div className="meal-list">
      {meals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MealList;