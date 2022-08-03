'user strict'
const userTest  = require("../models").userTest


const addUser = (req,res,next) => {
	userTest.create(req.body).then(user=>{
		console.log(user);
		next();
	}).catch(error =>{
		ex.raiseError(error,400,"Error","")
	})
}

module.exports={addUser}