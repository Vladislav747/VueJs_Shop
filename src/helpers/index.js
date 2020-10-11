import Noty from "noty";

export const showNoty = function(text, type = "error") {
	new Noty({
		text,
		type,
		timeout: 3000,
		layout: "topCenter",
	}).show();
};

export const PRODUCT_MANUFACTURES = [
	"Finn Flare",
	"Apple",
	"Sony",
	"Микояновский завод",
	"Эксмо",
	"Камчатский порт",
	"Казанская фабрика 'СпецМедЗащита'",
	"Септолит",
];

export const PRODUCT_CATEGORIES = ["Хлеб", "Молоко"];

export const generateRandomSeed = function() {
	return Math.random()
		.toString(36)
		.substr(2, 10);
};

export function throttle(callback, limit) {
	let wait = false;
	return function() {
		if (!wait) {
			callback.call();
			wait = true;
			setTimeout(function() {
				wait = false;
			}, limit);
		}
	};
}
