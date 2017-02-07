// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Book = require('./book.model.js');


// 获取指定用户图书列表
exports.getUserBook = function *() {
	try{
		const usercount = yield Book.count();
		const userbook = yield Book.find({master:this.request.body.master}).exec();
		this.status = 200;
		this.body = { status:"ok", data: userbook, count:usercount };
	}catch(err){
		this.throw(err);
	}
}

// 获取所有图书列表
exports.getBookList = function *() {
	try{
		const count = yield Book.count();
		const bookList = yield Book.find({}).exec();
		this.status = 200;
		this.body = { status:"ok", data: bookList, count:count };
	}catch(err){
		this.throw(err);
	}
}
// 获取指定书本的信息
exports.getBook = function *() {
	try{
		var book = yield Book.findById(this.request.body.id)
		this.status = 200;
		this.body = { status:"ok", data: book};
	}catch(err){
		this.throw(err);
	}
}


// 更新书的信息
exports.updateBook = function *() {
	try{
		console.log('update')
		var book = yield Book.findById(this.request.body.id)
		book.state = this.request.body.state
		book.borrow_time = this.request.body.borrow_time
		console.log(book)
		const newBook = yield book.save();
		this.status = 200;
		this.body = { status:"ok", data: newBook};
	}catch(err){
		this.throw(err);
	}
}

// 删除书的信息
exports.destroyBook = function *() {
	try{
		console.log('destroyBook')
		var book = yield Book.findByIdAndRemove(this.request.body.id)
		this.status = 200;
		this.body = { status:"ok"};
	}catch(err){
		this.throw(err);
	}
}

// 添加新书
exports.addBook = function *() {
	// const nickname = this.request.body.nickname;
	// const username = this.request.body.username;
	// const password = this.request.body.password;
	try{
		var newBook = new Book(this.request.body);
			const book = yield newBook.save();
		if(book) {
			this.status = 200;
			this.body = {status:"ok",message:"添加成功~"}
		} else {
			this.status = 200;
			this.body = {status:"error",message:"添加出错"}
		}

	}catch(err){
		this.throw(err);
	}
}
//登录
exports.upload = function *() {
	// const username = this.request.body.username;
	// const password = this.request.body.password;
	try{
    var newpath = parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ".jpg"
    var data = this.request.body.data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
		require("fs").writeFile("../client/static/upload/"+newpath, buf, function(err) {

		});
		this.status = 200;
		this.body = {status:"ok",path:newpath}

	}catch(err){
		this.throw(err);
	}
}


