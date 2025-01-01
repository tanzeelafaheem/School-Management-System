const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
router.post('/', scheduleController.addSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);
router.get("/schedule/date/:scheduleDate", scheduleController.getScheduleByDate);
router.get("/schedule/user/:userId", scheduleController.getScheduleByUserId);

module.exports = router;
