const db = require('../config/dbConfig');

//Add
exports.addSchedule = (req, res) => {
const { standardId, subjectId, userId, startTime, endTime, date } = req.body;

const query = 'INSERT INTO schedule (standardId, subjectId, userId, startTime, endTime, date) VALUES (?, ?, ?, ?, ?, ?)';
db.query(query, [standardId, subjectId, userId, startTime, endTime, date], (err, result) => {
if (err) {
return res.json({ error: err.message });
}
res.json({message:'Schedule added successfully!' });
});
};

// Get all
exports.getAllSchedules = (req, res) => {
  const query = `
    SELECT 
      subject.subjectName,
      USER.userName,
      standard.standardName,
      section.sectionName,
      schedule.startTime,
      schedule.endTime,
      schedule.Scheduledate
    FROM 
      schedule
    JOIN 
      subject ON schedule.subjectId = subject.subjectId
    JOIN 
      USER ON schedule.userId = USER.userId
    JOIN 
      standard ON schedule.standardId = standard.standardId
    JOIN 
      section ON standard.sectionId = section.sectionId`;

  db.query(query, (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
};

//Delete by ID
exports.deleteSchedule = (req, res) => {
const scheduleId = req.params.id;
const query = 'DELETE FROM schedule WHERE standardId = ?';
db.query(query, [scheduleId], (err, result) => {
if (err) {
return res.json({ error: err.message });
}
     res.json({message:'Schedule deleted successfully' });
   });
 };
 //Update
 exports.updateSchedule=(req,res)=>{
  const scheduleId=req.params.id;
  const { standardId, subjectId, userId, startTime, endTime, scheduleDate } = req.body;
  const query = 'UPDATE SCHEDULE SET standardId=?, subjectId=?, userId=?, startTime=?, endTime=?, date=?';
  db.query(query,[standardId, subjectId, userId, startTime, endTime, scheduleDate],(err,reult)=>{
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: 'User updated successfully!' });
  });
 };
 //get by id
exports.getScheduleById = (req, res) => {
  const scheduleId = req.params.id; 
  const query = `
      SELECT 
          subject.subName,
          USER.userName,
          standard.standardName,
          section.sectionName,
          schedule.startTime,
          schedule.endTime,
          schedule.date
      FROM 
          schedule
      JOIN 
          subject ON schedule.subjectId = subject.subId
      JOIN 
          USER ON schedule.userId = USER.userId
      JOIN 
          standard ON schedule.standardId = standard.standardId
      JOIN 
          section ON standard.sectionId = section.sectionId
      WHERE 
          schedule.scheduleId = ?`;

  db.query(query, [scheduleId], (err, results) => {
  if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Schedule not found' });
      }
  res.json(results[0]);
  });
};


