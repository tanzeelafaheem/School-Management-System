const db = require('../config/dbConfig');
  
// Add a new subject
exports.addSubject = (req, res) => {
  const { subjectName } = req.body;

  const query = 'INSERT INTO subject (subjectName) VALUE (?)';
  db.query(query, [subjectName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Subject added successfully!' });
  });
};

// Get all subjects
exports.getAllSubjects = (req, res) => {
  const query = 'SELECT * FROM Subject';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update subject by ID
exports.updateSubject = (req, res) => {
  const subjectId = req.params.id;
  const { subjectName } = req.body; 

  const query = "UPDATE subject SET subjectName = ? WHERE subjectId = ?";
  db.query(query, [subjectName, subjectId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({
      message: "Subject updated successfully",
      updatedSubject: { subjectId, subjectName },
    });
  });
};


// Delete subject by ID
exports.deleteSubject = (req, res) => {
  const subjectId = req.params.id;

  const deleteScheduleQuery = 'DELETE FROM Schedule WHERE subjectId = ?';

  db.query(deleteScheduleQuery, [subjectId], (err, result) => {
    if (err) {
      console.log("Error deleting schedules:", err.message);
    
      return res.status(500).json({ error: 'Error deleting associated schedules: ' + err.message });
    }

    console.log("Schedules deleted for subjectId:", subjectId);

    const deleteSubjectQuery = 'DELETE FROM Subject WHERE subjectId = ?';
    db.query(deleteSubjectQuery, [subjectId], (err, result) => {
      if (err) {
        console.log("Error deleting subject:", err.message);
 
        return res.status(500).json({ error: 'Error deleting subject: ' + err.message });
      }

      res.json({ message: 'Subject and associated schedules deleted successfully' });
    });
  });
};
