const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/', userController.addUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
module.exports = userRouter;
 