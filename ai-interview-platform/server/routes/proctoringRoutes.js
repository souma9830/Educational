const express = require('express');
const router = express.Router();
const proctoringController = require('../controllers/proctoringController');
const { protect } = require('../middleware/authMiddleware');

router.post('/log', protect, proctoringController.logViolation);
router.get('/session/:sessionId', protect, proctoringController.getSessionLogs);
router.get('/summary/:sessionId', protect, proctoringController.getSummary);
router.get('/integrity/:sessionId', protect, proctoringController.getIntegrityScore);

module.exports = router;
