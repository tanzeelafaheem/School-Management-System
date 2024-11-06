const express=require('express');
const subjectRouter=express.Router();
const subjectController=require('../controllers/subjectController');
 
subjectRouter.get('/',subjectController.getAllSubjects);
subjectRouter.put('/:id',subjectController.updateSubject);
subjectRouter.post('/',subjectController.addSubject);
subjectRouter.delete('/:id',subjectController.deleteSubject);

module.exports=subjectRouter;