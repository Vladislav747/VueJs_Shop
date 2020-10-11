import firebase from "firebase/app";
export default {
	showOverlay: function() {
		const divOverlay = document.getElementsByClassName("overlay");
		let index = 3000;
		if (divOverlay.length) {
			index = divOverlay[divOverlay.length - 1].style["z-index"] + 2;
		}

		let newDiv = document.createElement("div");
		newDiv.className = "overlay";
		newDiv.style["z-index"] = index;
		let divProductList = document.querySelector(".product-list");
		divProductList.append(newDiv);

		const result = {
			index: index + 1,
			div: newDiv,
		};

		return result;
	},

	firebase: firebase,
};
