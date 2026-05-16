const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM orders');
  res.json(rows);
});

// GET by id
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// POST (transaction)
router.post('/', async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { customer_id, items } = req.body;

    await connection.beginTransaction();

    let total = 0;

    for (let item of items) {
      const [productRows] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [item.product_id]
      );

      if (productRows.length === 0) throw new Error('Product not found');

      const product = productRows[0];

      if (product.stock < item.quantity) {
        throw new Error('Insufficient stock');
      }

      total += product.price * item.quantity;
    }

    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_id, total, status) VALUES (?, ?, ?)',
      [customer_id, total, 'pending']
    );

    const orderId = orderResult.insertId;

    for (let item of items) {
      const [productRows] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [item.product_id]
      );

      const product = productRows[0];

      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, product.price]
      );

      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({ message: 'Order created', orderId });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const [result] = await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;