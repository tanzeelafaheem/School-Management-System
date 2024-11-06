const db = require('../config/dbConfig');
//rewrite
// Add a new section
exports.addSection = (req, res) => {
  const { sectionName } = req.body;

  const query = 'INSERT INTO section (sectionName) VALUES (?)';
  db.query(query, [sectionName], (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: 'Section added successfully!' });
  });
};

// Get all sections
exports.getAllSections = (req, res) => {
  const query = 'SELECT * FROM section';
  db.query(query, (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
};

// Get section by ID
exports.getSectionById = (req, res) => {
  const sectionId = req.params.id;

  const query = 'SELECT * FROM section WHERE sectionId = ?';
  db.query(query, [sectionId], (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    if (result.length === 0) {
      return res.json({ message: 'Section not found' });
    }
    res.json(result[0]);
  });
};

// Update section
exports.updateSection = (req, res) => {
  const sectionId = req.params.id;
  const { sectionName } = req.body;

  const query = 'UPDATE section SET sectionName = ? WHERE sectionId = ?';
  db.query(query, [sectionName, sectionId], (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: 'Section updated successfully' });
  });
};

// Delete by ID
exports.deleteSection = (req, res) => {
  const sectionId = req.params.id;

  const query = 'DELETE FROM section WHERE sectionId = ?';
  db.query(query, [sectionId], (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: 'Section deleted successfully' });
  });
};
