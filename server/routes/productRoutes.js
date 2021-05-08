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

/**
 * Create fake items
 */
router.post("/init", (req, res) => {
	const arr = [
		{
			name: "Мужской спортивный костюм",
			category: "Одежда",
			price: 120,
			srcImage:
				"https://max-demo.ru/upload/resize_cache/iblock/fbe/450_450_140cd750bba9870f18aada2478b24840a/fbe57995f6082c1b45eb8788627748ee.jpg",
			manufacturer: "Германия",
			dateOfTask: new Date(Date.now()),
		},
		{
			name: "Мужские шорты с карманами",
			category: "Одежда",
			price: 200,
			srcImage:
				"https://max-demo.ru/upload/resize_cache/iblock/d9b/450_450_140cd750bba9870f18aada2478b24840a/d9b926aa427b6cdd321bf30d8bac9b70.jpg",
			manufacturer: "США",
			dateOfTask: new Date(Date.now()),
		},
		{
			name: "Мужской свитшот с принтом",
			category: "Одежда",
			price: 1200,
			srcImage:
				"https://max-demo.ru/upload/resize_cache/iblock/ab4/450_450_140cd750bba9870f18aada2478b24840a/ab4c90512553ed5d7502dad355618bcd.jpg",
			manufacturer: "Германия",
			dateOfTask: new Date(Date.now()),
		},
		{
			name: "Стул с металлическим каркасом",
			category: "Мебель",
			price: 250,
			srcImage:
				"https://max-demo.ru/upload/resize_cache/iblock/ea9/600_450_140cd750bba9870f18aada2478b24840a/ea9ed7b55266847b830aee5cbca2f667.jpg",
			manufacturer: "Германия",
			dateOfTask: new Date(Date.now()),
		},
		{
			name: "Шкаф угловой",
			category: "Мебель",
			price: 2250,
			srcImage:
				"https://max-demo.ru/upload/resize_cache/iblock/f37/450_600_140cd750bba9870f18aada2478b24840a/f37297196c581d99ba810808bacb9530.jpg",
			manufacturer: "Россия",
			dateOfTask: new Date(Date.now()),
		},
	];

	product
		.insertMany(arr)
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

/**
 * Clean all collection
 */
router.delete("/all", (req, res) => {
	product
		.deleteMany({})
		.then(() => {
			res.json({
				message: "Коллеция успешно очищена",
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
