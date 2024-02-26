function addListener(elem, ev, listener, option) {
	if (option)
		elem.addEventListener(ev, listener, option);
	else
		elem.addEventListener(ev, listener, false);
}

function removeListner(elem, ev, listener) {
	elem.removeEventListener(ev, listener, false);
}

// live chat
function changeToLiveChat() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'livechat');

	clearSearchBar();
	clearResult(); //나중에 지움
	clearSocket(); //나중에 지움
	// getData('GET', 'url').then((data) => {
	// 	user = new Chat (data.name, data.talking_to(대화상대 목록 및 최근 대화 내역));
	// 	showChattingRoom(user);
	// }) 웹소켓 방식으로 수정
	showChattingRoom();
}

function changeColorToBlue() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'blue');

	clearSearchBar();
	clearResult();
	clearSocket();
}

function changeToTournament() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'tournament');

	clearSearchBar();
	clearResult();
	clearSocket();
	enterTournament();
}

function changeColorToBlack() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'black');

	clearSearchBar();
	clearResult();
	clearSocket();
}

function changeColorToAqua() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'default');

	clearSearchBar();
	clearResult();
	clearSocket();
	makeSearchBar();
}






























window.onload = function (e) {
	let button = document.getElementById('search-bar-button');
	addListener(button, 'mouseover', (e) => {
		e.currentTarget.style.backgroundColor = 'rgb(69, 102, 234)';
		e.currentTarget.style.color = 'white';
		e.currentTarget.style.transitionDuration = '0.3s';
	});
	addListener(button, 'mouseout', (e) => {
		e.currentTarget.style.backgroundColor = 'white';
		e.currentTarget.style.color = 'rgb(69, 102, 234)';
		e.currentTarget.style.transitionDuration = '0.3s';
	});
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

function makeSearchBar() {
	let searchBar = makeTag('nav', ['id', 'search-bar'], ['class', 'searchbar navbar-light bg-light']);
	let form = makeTag('form', ['id', 'search-form'], ['class', 'form']);
	let input = makeTag('input', ['class', 'input mr-sm-2'], ['type', 'search'], ['placeholder', 'Search'], ['aria-label', 'Search']);
	let button = makeTag('button', ['id', 'search-bar-button'], ['class', 'button'], ['type', 'submit']);
	button.innerHTML = 'Search';
	addListener(button, 'mouseover', (e) => {
		e.currentTarget.style.backgroundColor = 'rgb(69, 102, 234)'; //#4566ea
		e.currentTarget.style.color = 'white';
		e.currentTarget.style.transitionDuration = '0.3s';
	});
	addListener(button, 'mouseout', (e) => {
		e.currentTarget.style.backgroundColor = 'white';
		e.currentTarget.style.color = 'rgb(69, 102, 234)';
		e.currentTarget.style.transitionDuration = '0.3s';
	});
	form.appendChild(input);
	form.appendChild(button);
	searchBar.appendChild(form);
	document.getElementById('body').insertBefore(searchBar, document.getElementById('result'));
}

function clearSearchBar() {
	let searchBar = document.getElementById('search-bar');
	if (searchBar)
		while (searchBar.firstChild) searchBar.firstChild.remove();
	else
		return ;
	document.getElementById('body').removeChild(searchBar);
}

function clearResult() {
	let result = document.getElementById('result');
	while (result.firstChild) result.firstChild.remove();
}

function clearSocket() {
	for (var i = 0; i < socket_list.length; i++) {
		socket_list[i].onclose = null;
		socket_list[i].close();
	}
}
