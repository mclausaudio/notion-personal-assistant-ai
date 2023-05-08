const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

// Define your routes and connect them to the corresponding controller functions
router.post('/', modelController.processAndSubmitToNotion);

// Add more routes as needed
// router.get('/some-endpoint', modelController.someControllerFunction);

module.exports = router;
