const router = require('express')();
const controller = require('../controllers/boards');

router.post('/write', controller.write);
router.put('/update', controller.update);
router.delete('/delete', controller.deletecontent);
router.get('/get', controller.readOneBoard);


module.exports = router;