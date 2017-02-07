const router = require("koa-router")();
const controller = require('./mail.controller');

router.post('/getMail',controller.getMail);
router.post('/getUserMail',controller.getUserMail);
router.post('/addMail',controller.addMail);
router.post('/updateMail',controller.updateMail);
module.exports = router;