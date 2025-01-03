const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
router.post('/', scheduleController.addSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);
router.get('/user/:userId/date/:scheduleDate', scheduleController.getScheduleByDateAndUser);



module.exports = router;
