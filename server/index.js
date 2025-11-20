require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use((req, res, next) => {
  res.sendStatus(403);
});


// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Routes

// GET /api/meals - Get all meals
app.get('/api/meals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM meals ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// GET /api/meals/:id - Get a single meal
app.get('/api/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM meals WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching meal:', error);
    res.status(500).json({ error: 'Failed to fetch meal' });
  }
});

// POST /api/meals - Create a new meal
app.post('/api/meals', async (req, res) => {
  try {
    const { name, calories, description, meal_time } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const result = await pool.query(
      'INSERT INTO meals (name, calories, description, meal_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, calories || null, description || null, meal_time || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(500).json({ error: 'Failed to create meal' });
  }
});

// PUT /api/meals/:id - Update a meal
app.put('/api/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, calories, description, meal_time } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const result = await pool.query(
      'UPDATE meals SET name = $1, calories = $2, description = $3, meal_time = $4 WHERE id = $5 RETURNING *',
      [name, calories || null, description || null, meal_time || null, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ error: 'Failed to update meal' });
  }
});

// DELETE /api/meals/:id - Delete a meal
app.delete('/api/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM meals WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json({ message: 'Meal deleted successfully', meal: result.rows[0] });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});