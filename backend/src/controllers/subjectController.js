const db = require('../config/dbConfig');
  
// Add a new subject
exports.addSubject = (req, res) => {
  const { subName } = req.body;

  const query = 'INSERT INTO subject (subName) VALUES (?)';
  db.query(query, [subName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Subject added successfully!' });
  });
};

// Get all subjects
exports.getAllSubjects = (req, res) => {
  const query = 'SELECT * FROM subject';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Update subject by ID
exports.updateSubject = (req, res) => {
  const subjectId = req.params.id;
  const { subName } = req.body;

  const query = 'UPDATE subject SET subName = ? WHERE subjectId = ?';
  db.query(query, [subName, subjectId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Subject updated successfully!' });
  });
};

// Delete subject by ID
exports.deleteSubject = (req, res) => {
  const subjectId = req.params.id;

  const query = 'DELETE FROM subject WHERE subjectId = ?';
  db.query(query, [subjectId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Subject deleted successfully' });
  });
};
