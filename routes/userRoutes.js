const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.registerUser); 
router.post('/user', userController.loginUser); 
router.post('/users/:id/formdetails', userController.addFormDetails); 

router.get('/users', userController.getAllUsers); 
router.get('/users/:id', userController.getUserById); 
router.get('/users/:id/formdetails',userController.getUserData);

router.put('/users/:id/formdetails', userController.updateUserData);

router.delete('/users/:id', userController.deleteUser);
router.delete('/users/:id/formdetails', userController.deleteUserData);


module.exports = router;
