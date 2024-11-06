const express = require('express');
const StandardRouter = express.Router();
const standardController = require('../controllers/standardController');

StandardRouter.post('/', standardController.addStandard);
StandardRouter.get('/', standardController.getAllStandards);
StandardRouter.get('/:id', standardController.getStandardById);
StandardRouter.put('/:id', standardController.updateStandard);
StandardRouter.delete('/:id', standardController.deleteStandard);

module.exports = StandardRouter;
