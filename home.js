function changeColorToBlue() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'blue');

	let result = document.getElementById('result');
	let font = document.getElementById('font');
	if (font) result.removeChild(font);
}

function changeColorToRed() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'red');

	let result = document.getElementById('result');
	let font = document.getElementById('font');
	if (font) result.removeChild(font);
}

function changeColorToGreen() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'green');

	let result = document.getElementById('result');
	let font = document.getElementById('font');
	if (font) result.removeChild(font);
}

function changeColorToBlack() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'black');

	let result = document.getElementById('result');
	let font = document.getElementById('font');
	if (font) result.removeChild(font);
}

function makeTag(tag, attr) {
	let new_tag = document.createElement(tag);

	if (arguments.length == 2)
		new_tag.setAttribute(attr[0], attr[1]);
	else if (arguments.length > 2){
		for (var i = 1; i < arguments.length; i++)
			new_tag.setAttribute(arguments[i][0], arguments[i][1]);
	}

	return new_tag;
}