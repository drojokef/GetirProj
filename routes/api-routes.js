// Initialize express router
let router = require('express').Router();

// Import records controller
var recordsController = require('../controller/recordsController');

// Records routes
router.route('/').get(recordsController.index);
router.route('/records').get(recordsController.getRecords);
router.route('/records').post(recordsController.postRecords);
router.route('/records').put(recordsController.putRecords);
router.route('/records').delete(recordsController.deleteRecords);

// Export API routes
module.exports = router;