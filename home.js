let socket_list = [];
let current_talking_to = 'jhwnag2';
let client_name = 'jhwnag2';
let cur_scrollY = 0;
let scrollYBot = 0;
let scrollFlag = 0;
let	user = new Chat('jhwang2', [['seokjyoo', 'hello', './img/character1.jpg', '3'], ['minsulee', 'hiiiiiii', './img/character2.jpg', '5'], ['semikim', 'byeeeeeee', './img/character3.jpg', ''], ['hyunwoju', 'see youuuuu', './img/character4.jpg', '']]); //서버에 채팅상대 리스트 요청;

function addListener(elem, ev, listener, option) {
	if (option)
		elem.addEventListener(ev, listener, option);
	else
		elem.addEventListener(ev, listener, false);
}

function removeListner(elem, ev, listener) {
	elem.removeEventListener(ev, listener, false);
}


function connectLiveChatSocket() {

	clearResult();
	clearSocket();

	const live_chat_socket = new WebSocket('ws://localhost:8000/dms/');

	if (live_chat_socket) socket_list.push(live_chat_socket);

	live_chat_socket.onopen = function (e) {

		let message = {
			type: "load",
			name: client_name,
		};

		live_chat_socket.send(JSON.stringify(message));
	};

	live_chat_socket.onclose = connectLiveChatSocket;

	live_chat_socket.onmessage = function (e) {

		let message = JSON.parse(e.data);

		switch (message.type) {
			case 'load':
				user = new Chat (client_name, message.talking_to);
				changeToLiveChat();
				break;
			case 'recent_message':
				if (user.talking_to.indexOf(message.room_num) == -1) {
					user.talking_to.push(message.new); //팔요한가?
					addChattingRoom(message);
				}
				else
					updateRecentMessage();
				break;
		}

		let resent_message = {
			type: 'recent_message',
			talking_to: 'semikim',
			message: 'hello_world',
			not_check: '5',
			room_num: '2',
		}
	}

	live_chat_socket.onerror = function (err) {
		live_chat_socket.onclose = null;
		console.log('Websoket Connect Failed: ' + err);
	};
}

// live chat
function changeToLiveChat() {


	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'white');

	clearResult(); //나중에 지움
	clearSocket();
	// getData('GET', 'url').then((data) => {
	// 	user = new Chat (data.name, data.talking_to(대화상대 목록 및 최근 대화 내역));
	// 	showChattingRoom(user);
	// }) 웹소켓 방식으로 수정
	showChattingRoom();
}

function addChattingRoom(data) {
	let div_chat_room = document.getElementById('chat-room');
	let button_individual_room = makeTag('button', ['id', data.room_num], ['class', 'chat-room-button'], ['onclick', 'blockTalkingTo()']);
	addListener(button_individual_room, 'click', openChattingRoom, {once : true});
	let div_individual_room = makeTag('div', ['class', 'chat-room-individual']);
	addListener(div_individual_room, 'mouseover', (e) => {
		e.currentTarget.style.backgroundColor = '#dcdcde';
	});
	addListener(div_individual_room, 'mouseout', (e) => {
		e.currentTarget.style.backgroundColor = 'white';
	});
	let div_individual_profile = makeTag('div', ['class', 'input-profile']);
	let img_individual_profile = makeTag('img', ['src', user.talking_to[i][2]], ['alt', 'hello']);
	div_individual_profile.appendChild(img_individual_profile);
	let div_individual_info = makeTag('div', ['class', 'input-info']);
	let div_individual_info_name = makeTag('div', ['class', 'name']);
	div_individual_info_name.innerHTML = user.talking_to[i][0];
	let div_individual_info_word = makeTag('div', ['class', 'word']);
	div_individual_info_word.innerHTML = user.talking_to[i][1];
	div_individual_room.appendChild(div_individual_profile);
	div_individual_info.appendChild(div_individual_info_name);
	div_individual_info.appendChild(div_individual_info_word);
	div_individual_room.appendChild(div_individual_info);
	button_individual_room.appendChild(div_individual_room);
	div_chat_room.insertBefore(button_individual_room, div_chat_room.firstChild);
}

function showChattingRoom(data) {

	let div_chat_room = makeTag('div', ['id', 'chat-room'], ['class', 'chat-room']);

	for (var i = 0; i < user.talking_to.length; i++)
	{
		let button_individual_room = makeTag('button', ['id', user.talking_to[i][0]], ['class', 'chat-room-button'], ['onclick', 'blockTalkingTo()']);
		addListener(button_individual_room, 'click', openChattingRoom, {once : true});
		let div_individual_room = makeTag('div', ['class', 'chat-room-individual']);
		addListener(div_individual_room, 'mouseover', (e) => {
			e.currentTarget.style.backgroundColor = '#dcdcde';
		});
		addListener(div_individual_room, 'mouseout', (e) => {
			e.currentTarget.style.backgroundColor = 'white';
		});
		let div_individual_profile = makeTag('div', ['class', 'input-profile']);
		let img_individual_profile = makeTag('img', ['src', user.talking_to[i][2]], ['alt', 'hello']);
		div_individual_profile.appendChild(img_individual_profile);
		let div_individual_info = makeTag('div', ['class', 'input-info']);
		let div_individual_info_name = makeTag('div', ['class', 'name']);
		div_individual_info_name.innerHTML = user.talking_to[i][0];
		let div_individual_info_word = makeTag('div', ['class', 'word']);
		div_individual_info_word.innerHTML = user.talking_to[i][1];
		div_individual_room.appendChild(div_individual_profile);
		div_individual_info.appendChild(div_individual_info_name);
		div_individual_info.appendChild(div_individual_info_word);
		div_individual_room.appendChild(div_individual_info);
		button_individual_room.appendChild(div_individual_room);
		div_chat_room.appendChild(button_individual_room);
	}
	document.getElementById('result').appendChild(div_chat_room);
}

function openChattingRoom(event) {

	event.preventDefault();
	const button = event.currentTarget;
	chattingWithFriend(button.id);
}

function chattingWithFriend(id) {

	clearResult();
	clearSocket();
	let	div_chat_option = makeTag('div', ['id', 'chat-option'], ['class', 'chat-option']);
	let button_chat_block = makeTag('button', ['id', 'block'], ['class', 'chat-button'], ['onclick', 'blockTalkingTo()'], ['onmouseover', 'onMouseOver(id)'], ['onmouseout', 'onMouseOut(id)']);
	let button_chat_non_block = makeTag('button', ['id', 'unblock'], ['class', 'chat-button'], ['onclick', 'unBlockTalkingTo()'], ['onmouseover', 'onMouseOver(id)'], ['onmouseout', 'onMouseOut(id)']);
	let button_game_invite = makeTag('button', ['id', 'invite'], ['class', 'chat-button'], ['onclick', 'inviteTalkingTo()'], ['onmouseover', 'onMouseOver(id)'], ['onmouseout', 'onMouseOut(id)']);

	button_chat_block.innerHTML = 'Block';
	button_chat_non_block.innerHTML = 'UnBlock';
	button_game_invite.innerHTML = 'Invite';
	div_chat_option.appendChild(button_chat_block);
	div_chat_option.appendChild(button_chat_non_block);
	div_chat_option.appendChild(button_game_invite);
	let div_chat_form = makeTag('div', ['class', 'chat_wrap']);
	let	div_chat_input = makeTag('div', ['class', 'input-div']);
	let textarea = makeTag('textarea', ['id', 'text-area'], ['class', 'text-area'], ['placeholder', 'Press Enter for send message.']);

	div_chat_input.appendChild(textarea);

	let div_chat = makeTag('div', ['id', 'chat'], ['class', 'chat']);

	div_chat_form.appendChild(div_chat_option);
	div_chat_form.appendChild(div_chat);

	document.getElementById('result').appendChild(div_chat_form);
	document.getElementById('result').appendChild(div_chat_input);
	current_talking_to = id;
	// user.room_num = user.talking_to[user.indexOf(current_talking_to)];
	console.log(current_talking_to);
	//1. 서버측에 이전 채팅기록 요구 및 출력
	//getAndShowMessageHistory();
	//2. 웹소켓 주소 연결
	// connectWithTalkingTo();
	user.init();//나중에 제거 (getAndShowMessageHistory에 추가됨)
}

//1. 서버측에 이전 채팅기록 요구
function getAndShowMessageHistory() {
	getData('GET', 'url/path/' + user.room)
	.then((data) => {
		user.socket_talking_to = data.socket;
		for (var i = 0; i < data.message.length; i++)
			showMessage(data.message[i]);
	})
	.then(user.init())
	.catch((err) => {
		console.log(err);
	});
}
//2. 메세지 출력

function showMessage(message) {
	if (message.name == user.name)
		showMessageToRight(message);
	else
		showMessageToLeft(message);
}

//3. 웹소켓 주소 연결
function connectWithTalkingTo() {
	let socket = WebSocket(user.socket_talking_to);

	// socket.onopen =

	socket.onmessage = function (e) {

		const message = JSON.parse(e.data);

		showMessage(message);
	}
}

//Live Chat
function Chat(name, talking_to) {
	this.name = name;
	this.talking_to = talking_to;
	this.socket_talking_to;
	this.room_num;
}

Chat.prototype.init = function() {
	addListener(document, 'keydown', this.sendMessage);
	addListener(document.querySelector('.chat'), 'wheel', saveCurrentScrollPosition);
}

Chat.prototype.sendMessage = function(e) {
	if (e.keyCode == 13) {

		e.preventDefault();

		let msg = $('div.input-div textarea').val();

		if (msg)
			Chat.prototype.sendMessageToServer(msg);
		else
			window.alert('Type message.');

		Chat.prototype.clearTextArea();
	}
}

Chat.prototype.sendMessageToServer = function(message) {

	const data = {
		"room_num": user.room_num,
		"name": user.getName(),
		// "current_talking_to": current_talking_to,
		"message": message,
	};

	const get_message = message;
	if (get_message.indexOf('left') == -1)
		this.showMessageToRight(message);
	else
		this.showMessageToLeft(message);
	scrollYBot = document.querySelector('.chat_wrap').scrollHeight - document.querySelector('.chat_wrap').clientHeight;;

	if (scrollFlag == 0)
		cur_scrollY = scrollYBot;

	scrollToNewElement(document.querySelector('.chat_wrap'));
}

function checkScrollOrNot(resultElement) {
	if (getCurrentScrollPosition(resultElement) != 0)
		return 0;
	return 1;
}

function saveCurrentScrollPosition(e) {
	cur_scrollY = document.querySelector('.chat_wrap').scrollTop;

	if (scrollYBot - cur_scrollY == 0.5)
		cur_scrollY = scrollYBot;

	scrollFlag = 0;

	if (cur_scrollY != scrollYBot)
		scrollFlag = 1;
}

function getCurrentScrollPosition(resultElement) {
	if (resultElement)
		return resultElement.scrollHeight - resultElement.scrollTop - resultElement.clientHeight;
}

function scrollToNewElement(resultElement) {
	if (cur_scrollY < scrollYBot)
		return ;
	let newElement = resultElement.lastElementChild;
	if (newElement) {
		newElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}
}

Chat.prototype.showMessageToLeft = function(message) {
	let div_chat = document.getElementById('chat');
	let div_chat_talking_to = makeTag('div', ['class', 'talking_to']);
	let div_individual_profile = makeTag('div', ['class', 'input-profile']);
	let img_individual_profile = makeTag('img', ['src', user.talking_to[0][2]], ['alt', 'hello']);
	let div_chat_message = makeTag('div', ['class', 'chat-box']);
	let div_chat_name = makeTag('p', ['class', 'name-format']);
	let p_message = makeTag('p', ['class', 'chat-format']);

	div_individual_profile.appendChild(img_individual_profile);
	div_chat_name.innerHTML = current_talking_to;
	div_chat_message.appendChild(div_chat_name);
	p_message.innerHTML = message; //message.message
	div_chat_message.appendChild(p_message);

	let div_chat_message_box = makeTag('div', ['class', 'chat-message-box']);
	div_chat_message_box.appendChild(div_individual_profile);
	div_chat_message_box.appendChild(div_chat_message);

	div_chat_talking_to.appendChild(div_chat_message_box);
	div_chat_talking_to.appendChild(makeTag('div'));
	div_chat.appendChild(div_chat_talking_to);

}

Chat.prototype.showMessageToRight = function(message) {
	let div_chat = document.getElementById('chat');
	let div_chat_sender = makeTag('div', ['class', 'sender']);
	let div_individual_profile = makeTag('div', ['class', 'input-profile']);
	let img_individual_profile = makeTag('img', ['src', './img/character5.jpg'], ['alt', 'hello']);
	let div_chat_message = makeTag('div', ['class', 'chat-box']);
	let div_chat_name = makeTag('p', ['class', 'name-format']);
	let p_message = makeTag('p', ['class', 'chat-format']);

	div_individual_profile.appendChild(img_individual_profile);
	div_chat_name.innerHTML = user.getName();
	p_message.innerHTML = message;
	div_chat_message.appendChild(div_chat_name);
	div_chat_message.appendChild(p_message);

	div_chat_sender.appendChild(makeTag('div'));

	let div_chat_message_box = makeTag('div', ['class', 'chat-message-box']);
	div_chat_message_box.appendChild(div_chat_message);
	div_chat_message_box.appendChild(div_individual_profile);
	div_chat_sender.appendChild(div_chat_message_box);
	div_chat.appendChild(div_chat_sender);
}


Chat.prototype.receiveMessage = function(data) {

}

function blockTalkingTo() {
	console.log('Block');
}

function unBlockTalkingTo() {
	console.log('UnBlock');
}

function inviteTalkingTo() {
	console.log('InviteTalkingTo');
}

Chat.prototype.clearTextArea = function() {
	document.getElementById('text-area').value = '';
}

Chat.prototype.getName = function() {
	return this.name;
}

async function postData(method, url, data) {
	const response = await fetch(url, {
		method: method,
		headers: {
			Authorization: 'Bearer' + localStorage.getItem('access'),
			'Content-Type': 'application/json'
		},
		body: body
	});
	return response.json();
}

async function getData(method, url) {
	const response = await fetch(url, {
		method: method,
		headers: {
			Authorization: 'Bearer' + localStorage.getItem('access'),
			'Content-Type': 'application/json'
		}
	});
	return response.json();
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

function changeColorToBlue() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'blue');

	clearResult();
	clearSocket();
}

function changeColorToRed() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'red');

	clearResult();
	clearSocket();
}

function changeColorToBlack() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'black');

	clearResult();
	clearSocket();
}

function changeColorToAqua() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'default');

	clearResult();
	clearSocket();
}

function onMouseOver(id) {
	let nav = document.getElementById(id);

	nav.style.backgroundColor = 'black';
	nav.style.color = 'white';
	nav.style.transitionDuration = '0.3s';
}


function onMouseOut(id) {
	let nav = document.getElementById(id);

	nav.style.backgroundColor = 'white';
	nav.style.color = 'black';
	nav.style.transitionDuration = '0.3s';
}