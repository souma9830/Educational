const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getHealthStatus);
router.get('/diagnostics', healthController.getDetailedDiagnostics);

module.exports = router;
