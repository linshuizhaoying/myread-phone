const router = require("koa-router")();
const controller = require('./book.controller');

router.post('/getUserBook',controller.getUserBook);
router.get('/getBookList',controller.getBookList);
router.post('/addBook',controller.addBook);
router.post('/getBook',controller.getBook);
router.post('/updateBook',controller.updateBook);
router.post('/destroyBook',controller.destroyBook);
router.post('/upload',controller.upload);
module.exports = router;