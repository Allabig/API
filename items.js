const express = require('express');
const router = express.Router();
const store = require('../data/store');

// Get all items
router.get('/', (req, res) => {
  res.json(store.items);
});

// Get item by ID
router.get('/:id', (req, res) => {
  const item = store.items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Create item
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newItem = {
    id: store.nextId++,
    name,
    description,
  };
  store.items.push(newItem);
  res.status(201).json(newItem);
});

// Update item
router.put('/:id', (req, res) => {
  const item = store.items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  item.name = name;
  item.description = description;
  res.json(item);
});

// Delete item
router.delete('/:id', (req, res) => {
  const index = store.items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deleted = store.items.splice(index, 1);
  res.json({ message: 'Item deleted', item: deleted[0] });
});

module.exports = router;
