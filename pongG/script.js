function addListener(elem, ev, listener) {
	elem.addEventListener(ev, listener, false);
}

addListener(window, 'load', init);

function init() {
	addListener(window, 'keydown', function(e) {
		const key = document.getElementById(e.key);
		let json = JSON.stringify(serializeEvent(e));
		console.log(json);
		// console.log(e);
		if (key) key.classList.add('pressed');

	});

	addListener(window, 'keyup', function(e) {
		const key = document.getElementById(e.key);
		if (key) key.classList.remove('pressed');
	});
}

function serializeEvent(e) {
	return {
		altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        type: e.type,
        key: e.key
	};
}

function getXHR() {
	return new XMLHttpRequest();
}

function asynSend() {
	let	req = getXHR();
	let json = JSON.stringify(true);

	req.onreadystatechange = function() {
		let result = document.getElementById('result');
		if (req.readyState == 4) {
			if (req.status == 200) {
				result.innerHTML = req.responseText;
			}
			else {
				result.innerHTML = "서버 에러 발생";
			}
		}
		else {
			result.innerHTML = "통신중....";
		}
	}
	req.open ('POST', requestURL);
	req.responseType = "json";
	req.send (json);
}