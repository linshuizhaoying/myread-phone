// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Mail = require('./mail.model.js');
const Book = require('../books/book.model.js');

// 获取所有邮件列表
exports.getMail = function *() {
	try{
		const mailcount = yield Mail.count();
		var usermail = yield Mail.find({}).exec();
		//联合查询书本状态
		// var temp = usermail;
		// for (var i = 0; i < usermail.length; i++) {
		// 	var book = yield Book.findById(usermail[i].book_id)
		// 	console.log(book)
		// 	temp[i].book_state = book.state
		// }
		this.status = 200;
		this.body = { status:'ok', data: usermail};
	}catch(err){
		this.throw(err);
	}
}


// 获取用户邮件列表
exports.getUserMail = function *() {
	try{
		const mailcount = yield Mail.count();
		var usermail = yield Mail.find({to_id:this.request.body.id}).exec();

		//联合查询书本状态
		var temp = usermail;
		for (var i = 0; i < usermail.length; i++) {
			var book = yield Book.findById(usermail[i].book_id)
			temp[i].book_state = book.state
		}
		this.status = 200;
		this.body = { status:'ok', data: temp, count:mailcount };
	}catch(err){
		this.throw(err);
	}
}


// 添加新邮件
exports.addMail = function *() {
	// const nickname = this.request.body.nickname;
	// const username = this.request.body.username;
	// const password = this.request.body.password;
	try{
		var newMail = new Mail(this.request.body);
			const mail = yield newMail.save();
		if(mail) {
			this.status = 200;
			this.body = {status:'ok',message:'添加成功~'}
		} else {
			this.status = 200;
			this.body = {status:'error',message:'添加出错'}
		}

	}catch(err){
		this.throw(err);
	}
}


// 更新邮件的信息
exports.updateMail = function *() {
	try{
		var mail = yield Mail.findById(this.request.body.id)
		mail.isreject =  this.request.body.isreject
		mail.state = this.request.body.state

		var book = yield Book.findById(this.request.body.book_id)
		book.state = this.request.body.state
		book.borrow_time = this.request.body.borrow_time
		book.reader = this.request.body.reader
		const newBook = yield book.save();
		const newMail = yield mail.save();
		this.status = 200;
		this.body = { status:'ok', data: newMail};
	}catch(err){
		this.throw(err);
	}
}

// 删除邮件的信息
exports.destroyMail = function *() {
	try{
		console.log('destroyMail')
		var mail = yield Mail.findByIdAndRemove(this.request.body.id)
		this.status = 200;
		this.body = { status:'ok'};
	}catch(err){
		this.throw(err);
	}
}
