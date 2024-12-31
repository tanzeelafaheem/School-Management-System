const db = require('../config/dbConfig'); // Import the database connection

// add
exports.addStandard=(req,res) =>{
    const {standardName,sectionId}=req.body;
    const q='INSERT INTO standard (standardName, sectionId) VALUES (?, ?)';
    db.query(q,[standardName,sectionId],(err,result)=>{
        if(err){
            return res.json(err);
        }
        return res.json("Standard added successfully!")
    })
}

//Get all
exports.getAllStandards=(req,res)=>{
    const q="SELECT * FROM standard";
    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
    };

//get by id
exports.getStandardById = (req, res) => {
    const { id } = req.params;
    
    const query = 'SELECT * FROM standard WHERE standardId = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.json({ error: 'Database error: ' + err.message });
        }
        if (results.length === 0) {
            return res.json({ message: 'Standard not found' });
        }
        res.json(results[0]);
    });
};

//update
exports.updateStandard = (req, res) => {
    const { id } = req.params;
    const { standardName, sectionId } = req.body;
    
    const query = 'UPDATE Standard SET standardName = ?, sectionId = ? WHERE standardId = ?';
    
    db.query(query, [standardName, sectionId, id], (err, results) => {
        if (err) {
            return res.json({ error: 'Database error: ' + err.message });
        }
        if (results.affectedRows === 0) {
            return res.json({ message: 'Standard not found' });
        }
        res.json({ message: 'Standard updated successfully' });
    });
};

//delete by id
exports.deleteStandard = (req, res) => {
    const { standardId } = req.params;

    const query1='DELETE FROM Schedule WHERE standardId = ?';
    db.query(query1, [standardId], (err, results) => {
        if (err) {
             console.log("Error deleting schedule :",err.message);
             return res.status(500).json({error:'Error deleting associated schedules :'+err.message});
        }
        console.log("Schedules deleted for Standard Id:",standardId);
    
    const query2 = 'DELETE FROM Standard WHERE standardId = ?';
    
    db.query(query2, [standardId], (err, results) => {
        if (err) {
            console.log("Error deleting subject:", err.message);
     
            return res.status(500).json({ error: 'Error deleting subject: ' + err.message });
          }
    
          res.json({ message: 'Subject and associated schedules deleted successfully' });
        });
})
};
