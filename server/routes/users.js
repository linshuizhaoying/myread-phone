const router = require('koa-router')()
const user = require('../db/controllers/user')

router.post('/register',user.register);
router.get('/register',user.show);
module.exports = router;
