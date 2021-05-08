const mongoose = require("mongoose");
const keys = require("./keys");

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));
