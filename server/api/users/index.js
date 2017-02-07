const router = require("koa-router")();
const controller = require('./user.controller');

router.get('/getUserList',controller.getUserList);
router.post('/addUser',controller.addUser);
router.post('/updateUser',controller.updateUser);
router.post('/login',controller.login);
module.exports = router;