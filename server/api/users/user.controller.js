// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('./user.model.js');
//后台获取用户列表
exports.getUserList = function *() {
	try{
		const count = yield User.count();
		const userList = yield User.find({}).exec();
		this.status = 200;
		this.body = { status:"ok", data: userList, count:count };
	}catch(err){
		this.throw(err);
	}
}
// 更新用户的信息
exports.updateUser = function *() {
	try{
		var user = yield User.findById(this.request.body.id)
		user.address =  this.request.body.address
		user.nickname = this.request.body.nickname
		const newUser = yield user.save();
		this.status = 200;
		this.body = { status:'ok', user: newUser};
	}catch(err){
		this.throw(err);
	}
}

//添加用户
exports.addUser = function *() {
	// const nickname = this.request.body.nickname;
	// const username = this.request.body.username;
	// const password = this.request.body.password;
	try{
		this.request.body.address = ""
		this.request.body.avatar = ""
		var newUser = new User(this.request.body);
		var result = yield User.find({username: this.request.body.username})
		if(result.length == 0){
			var user = yield newUser.save();
			var temp = user
			temp.password = ''
			this.status = 200;
			this.body = {status:"ok",user:temp,message:"添加成功~"}
			console.log(this.body)
		} else {
			this.status = 200;
			this.body = {status:"error",message:"该用户已存在!"}
		}

	}catch(err){
		this.throw(err);
	}
}
//登录
exports.login = function *() {
	// const username = this.request.body.username;
	// const password = this.request.body.password;
	try{
		var result = yield User.find({username: this.request.body.username})
		console.log(result[0].password == this.request.body.password)
		if(result[0].username == this.request.body.username && result[0].password == this.request.body.password){
			console.log("2333")
			this.status = 200;
			result[0].password = ''
			console.log(result)
			this.body = {status:"ok",user:result,message:"登录成功~"}
		} else {
			this.status = 200;
			this.body = {status:"error",message:"账号或者密码错误,请重新登录!"}
		}

	}catch(err){
		this.throw(err);
	}
}


