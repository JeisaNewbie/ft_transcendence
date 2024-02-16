function addListener(elem, ev, listener) {
	elem.addEventListener(ev, listener, false);
}

function removeListner(elem, ev, listener) {
	elem.removeEventListener(ev, listener, false);
}

addListener(window, 'load', init);

function init() {
	addListener (window, 'keydown', showLogIn);

	addListener (window, 'wheel', (e) => {
		// console.log(e.deltaY, e.deltaX);
	});

	addListener (window, 'scroll', function(e){
		console.log(window.scrollX, window.scrollY);
	} );
}

function showLogIn() {
	let start = document.getElementById('start');

	if (start) document.body.removeChild(start);
	document.body.removeAttribute('style');
	document.body.classList.add('login-background');


	let main = makeTag('div', ['id', 'main']);
	let div_main = makeTag('div', ['id', 'login-form']);
	let	div_header = makeTag('div', ['id', 'login-header']);
	let div_body = makeTag('div', ['id', 'login-body']);

	div_header.classList.add('logo');
	div_header.innerHTML = "Pong Game";
	div_header.appendChild(makeTag('div', ['id', 'result']));

	div_body.classList.add('login-wrapper')

	let form = makeTag('form', ['onsubmit', "return logIn();"], ['action', 'URL'], ['method', 'post']);
	form.classList.add('login-body-form');

	let	div = makeTag('div');
	let input = makeTag('input', ['id', 'username'], ['type', 'text'], ['placeholder', 'Enter your name']);
	input.classList.add('username');
	div.appendChild(input);
	form.appendChild(div);

	div = makeTag('div');
	input = makeTag('input', ['id', 'password'], ['type', 'password'], ['placeholder', 'Enter your password']);
	input.classList.add('password');
	div.appendChild(input);
	form.appendChild(div);

	div = makeTag('div', ['id', 'signin_button']);
	input = makeTag('input', ['type', 'hidden']); //사용자가 알 필요 없는 값을 서버에 보낼때 필요
	div.appendChild(input);
	input = makeTag('input', ['type', 'submit'], ['value', 'Sign In']);
	input.setAttribute('style', 'width: 100%');
	div.appendChild(input);
	div.classList.add('login-button');
	form.appendChild(div);
	div_body.appendChild(form);

	form = makeTag('form', ['onsubmit', "return showSignUp();"]);
	form.classList.add('login-body-form');
	div = makeTag('div', ['id', 'signup-button']);
	input = makeTag('input', ['type', 'submit'], ['value', 'Sign Up']);
	input.setAttribute('style', 'width: 100%');
	div.appendChild(input);
	div.classList.add('signup-button');
	form.appendChild(div);
	div_body.appendChild(form);

	form = makeTag('form', ['action', 'https://auth.42.fr/auth/realms/students-42/login-actions/authenticate?execution=e3ed291b-5578-4fcf-9f1a-d38a1ee483af&client_id=intra&tab_id=T11vR6Sh9g4'],['method', 'get']);
	form.classList.add('login-body-form');
	div = makeTag('div', ['id', '42login-button']);
	input = makeTag('input', ['type', 'submit'], ['value', '42Log In']);
	input.setAttribute('style', 'width: 100%');
	div.appendChild(input);
	div.classList.add('ftlogin-button');
	form.appendChild(div);
	div_body.appendChild(form);

	div_main.appendChild(div_header);
	div_main.appendChild(div_body);
	main.appendChild(div_main);
	document.body.insertBefore (main, document.getElementById('js'))
	removeListner (window, 'keydown', showLogIn);
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

function showSignUp() {
	let login_form = document.getElementById('login-form');
	if (login_form) document.getElementById('main').removeChild(login_form);

	let div_main = makeTag('div', ['id', 'signup-form']);
	let	div_header = makeTag('div', ['id', 'signup-header']);
	let div_body = makeTag('div', ['id', 'signup-body']);

	div_header.classList.add('logo');
	div_header.innerHTML = "Pong Game";
	div_header.appendChild(makeTag('div', ['id', 'result']));

	div_body.classList.add('login-wrapper')

	let form = makeTag('form', ['onsubmit', 'return signUp();'], ['action', 'URL/user_database'], ['method', 'post']);
	form.classList.add('login-body-form');

	let	div = makeTag('div');
	let input = makeTag('input', ['id', 'username'], ['type', 'text'], ['placeholder', 'Enter your name']);
	input.classList.add('username');
	div.appendChild(input);
	form.appendChild(div);

	div = makeTag('div');
	input = makeTag('input', ['id', 'password'], ['type', 'password'], ['placeholder', 'Enter your password']);
	input.classList.add('password');
	div.appendChild(input);
	form.appendChild(div);

	div = makeTag('div');
	input = makeTag('input', ['id', 'nickname'], ['type', 'text'], ['placeholder', 'Enter your Nickname']);
	input.classList.add('username');
	div.appendChild(input);
	form.appendChild(div);

	div = makeTag('div', ['id', 'signup']);
	input = makeTag('input', ['type', 'submit'], ['value', 'Sign Up']);
	input.setAttribute('style', 'width: 100%; height: 50px;');
	div.appendChild(input);
	div.classList.add('login-button');
	form.appendChild(div);

	div_body.appendChild(form);
	div_main.appendChild(div_header);
	div_main.appendChild(div_body);
	main.appendChild(div_main);
	document.body.insertBefore (main, document.getElementById('js'))
}

function logIn() {
	let id = document.getElementById('username').value;
	let pw = document.getElementById('password').value;

	if (!id || !pw)
	{
		window.alert ("Please Enter Id and Password");
		return false;
	}

	let url = document.getElementById('login-body').firstChild.getAttribute('action');
	sendHttpRequest('POST', url, [id, pw], loadHome, asynSend);
	return true;
}

function signUp() {
	let id = document.getElementById('username').value;
	let pw = document.getElementById('password').value;
	let nm = document.getElementById('nickname').value;

	if (!id || !pw || !nm)
	{
		window.alert ("Please Enter All");
		return false;
	}

	let url = document.getElementById('signup-body').firstChild.getAttribute('action');
	sendHttpRequest('POST', url, [id, pw], showLogIn, asynSend);
	return true;
}

function sendHttpRequest(method, url, body, success, fail) {
	fetch(url, {
		method: method,
		headers: {
			Authorization: 'Bearer' + localStorage.getItem('access'),
			'Content-Type': 'application/json'
		},
		body: body
	}).then ((response) => {
		if (response.status == 200 || response.status == 201) {
			return success();
		}
		const refresh = getCookie('refresh');
		if (response.status == 401 && refresh) {
			fetch (url, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer' + localStorage.getItem('access'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify ({
					refresh: getCookie('refresh')
				})
			}).then ((response) => {
				if (response.ok)
					return response.json();
			}).then ((result) => {
				localStorage.setItem('access', result.access)
				sendHttpRequest (method, url, body, success, fail);
			})
		} else {
			return fail(method, url, body);
		}
	})
}


function asynSend(method, url) {
	let	req =  new XMLHttpRequest();
	let json = JSON.stringify(arguments);

	req.onreadystatechange = function() {
		let result = document.getElementById('result');
		result.classList.add ('error');
		if (req.readyState == 4) {
			if (req.status == 200) {
				let response = JSON.parse(req.responseText);

				const access = searchAccess(response);
				if (access)
					localStorage.setItem('access', access);

				const refresh = searchRefresh(response);
				if (refresh)
					localStorage.setItem('refresh', refresh);
			}
			else {
				result.innerHTML = "서버 에러 발생";
			}
		}
		else {
			result.innerHTML = "통신중....";
		}
	}
	req.open (method, url, true);
	req.responseType = "json";
	req.send (json);
}

function loadHome() {

}



function event() {
	addListener(window, 'keydown', function(e) {
		let key = document.getElementById(e.key);
		// let json = JSON.stringify(serializeEvent(e));
		// console.log(json);
		if ((37 <= e.keyCode && e.keyCode <= 40)) key.classList.add('pressed');
		else if (49 <= e.keyCode && e.keyCode <= 52){
			if (e.keyCode == 49) {
				key = document.getElementsByClassName ('grid-header');
			}
			if (e.keyCode == 50) {
				key = document.getElementsByClassName ('grid-main');
			}
			if (e.keyCode == 51) {
				key = document.getElementsByClassName ('grid-sidea');
			}
			if (e.keyCode == 52) {
				key = document.getElementsByClassName ('grid-sideb');
			}
			for (let i = 0; i < key.length; i++)
				key[i].classList.add('pressed');
		}
	});

	addListener(window, 'keyup', function(e) {
		let key = document.getElementById(e.key);
		if ((37 <= e.keyCode && e.keyCode <= 40)) key.classList.remove('pressed');
		else if (49 <= e.keyCode && e.keyCode <= 52) {
			if (e.keyCode == 49) {
				key = document.getElementsByClassName ('grid-header');
			}
			if (e.keyCode == 50) {
				key = document.getElementsByClassName ('grid-main');
			}
			if (e.keyCode == 51) {
				key = document.getElementsByClassName ('grid-sidea');
			}
			if (e.keyCode == 52) {
				key = document.getElementsByClassName ('grid-sideb');
			}
			for (let i = 0; i < key.length; i++)
				key[i].classList.remove('pressed');
		}
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