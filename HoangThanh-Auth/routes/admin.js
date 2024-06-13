const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/', adminController.signIn);
router.post('/login', adminController.login);
router.get('/viewUsers', adminController.getAllUsers);
router.post('/users/add', adminController.addUser);
router.get('/users/:id', adminController.getUser);
router.post('/users/edit/:id', adminController.editUser);
router.delete('/users/delete/:id', adminController.deleteUser);
router.get('/viewOrders', adminController.viewTicket);
router.post('/tickets/collected/:id', adminController.markAsCollected);

module.exports = router;