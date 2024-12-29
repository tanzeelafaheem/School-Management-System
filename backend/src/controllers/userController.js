const db = require('../config/dbConfig');

//login
exports.login = (req, res) => {
  const { email, pass } = req.body;
  const query = 'SELECT * FROM USER WHERE email = ? AND pass = ?';
  
  db.query(query, [email, pass], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Assuming that the result contains user data, you should return the necessary user info
    const user = result[0];
    const { userId, userName, email, phoneNo, userType } = user;

    // Send back a user object with only necessary details
    res.json({
      userId,
      userName,
      email,
      phoneNo,
      userType, // Ensure you return 'userType' here to help frontend navigate
    });
  });
};


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

// Get user by id
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

  const deleteScheduleQuery = 'DELETE FROM schedule WHERE userId = ?';

  db.query(deleteScheduleQuery, [userId], (err, result) => {
    if (err) {
      console.log("Error deleting schedules:", err.message);
    
      return res.status(500).json({ error: 'Error deleting associated schedules: ' + err.message });
    }

    console.log("Schedules deleted for userId:", userId);

    const deleteUserQuery = 'DELETE FROM user WHERE userId = ?';
    db.query(deleteUserQuery, [userId], (err, result) => {
      if (err) {
        console.log("Error deleting user:", err.message);
 
        return res.status(500).json({ error: 'Error deleting user: ' + err.message });
      }

      res.json({ message: 'User and associated schedules deleted successfully' });
    });
  });
};

