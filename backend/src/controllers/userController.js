const db = require('../config/dbConfig');

// Add
exports.addUser = (req, res) => {
  const { userName, email, pass, phoneNo, userType } = req.body;

  const query = 'INSERT INTO USER (userName, email, pass, phoneNo, userType) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userName, email, pass, phoneNo, userType], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'User added successfully!' });
  });
};

// Get all
exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM USER';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Get user
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM USER WHERE userId = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
};

// Update user details
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { userName, email, phoneNo, pass, userType } = req.body;

  const query = 'UPDATE USER SET userName = ?, email = ?, phoneNo = ?, pass = ?, userType = ? WHERE userId = ?';
  db.query(query, [userName, email, phoneNo, pass, userType, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User updated successfully!' });
  });
};

// Delete user by ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM USER WHERE userId = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User deleted successfully' });
  });
};
