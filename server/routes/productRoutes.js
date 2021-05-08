let product = require("../models/product.js");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

router.get("/", (req, res) => {
	product
		.find()
		.then(products => {
			console.log(products, "products");
			res.json(products);
		})
		.catch(errors => {
			res.json({
				message: "error",
				errors: errors.errors,
			});
		});
});

router.post("/", (req, res) => {
	const newProduct = {
		id: new mongoose.Types.ObjectId().toHexString(),
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		srcImage: req.body.srcImage,
		price: req.body.price,
		manufacturer: req.body.manufacturer,
		dateOfTask: new Date(Date.now()),
	};

	product
		.create(newProduct)
		.then(product => {
			res.json({
				message: "success",
				name: product.name,
			});
		})
		.catch(errors => {
			res.json({
				message: "error",
				errors: errors.errors,
			});
		});
});

//Для обновления рейтинга
router.put("/", (req, res) => {
	product
		.findOneAndUpdate(
			{
				id: req.body.id,
			},
			{
				rating: req.body.rating,
			}
		)
		.then(() => {
			res.json({
				message: "success",
				name: req.body.name,
			});
		});
});

router.get("/:id", (req, res) => {
	var productFind = product
		.findOne({
			id: req.params.id,
		})
		.exec();
	productFind
		.then(data => {
			res.json(data);
		})
		.catch(errors => {
			res.json({
				message: "error",
				errors: errors.errors,
			});
		});
});

router.delete("/:id", (req, res) => {
	product
		.deleteOne({
			id: req.params.id,
		})
		.then(() => {
			res.json({
				message: "success",
			});
		});
});

module.exports = router;
