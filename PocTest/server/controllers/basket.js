'user strict'

const basketItems = require('../models').basketItems
const basket = require('../models').baskets

const addBasketItems = (req, res, next)=>{
	basketItems.create(req.body).then(items =>{
		console.log(items);
		next();
	}).catch(error => {
		ex.raiseError("Error in baskteItme",400, error.name, "Error")
	})
}

const addBasket = (req, res, next) => {
	let productList = "";
	if(req.body.produc_list){
		const list = req.body.produc_list;

		list.forEach(element => {
			productList+=element+","
		});
	}
	req.body.produc_list = productList;
	basket.create(req.body).then(basket => {
		console.log(basket);
		next();
	}).catch(error => {
		ex.raiseError("Error in basket", 400, error.name,"Error")
	})
	
}

const getBasket = (req, res, next) => {
	basket.findAll({include:[{model:basketItems, as:'basketItems'}]}).then(basket => {
		console.log(basket)
	}).catch(error => {
		console.log(error);
	})
}

module.exports = {
	addBasketItems,
	addBasket,
	getBasket
}