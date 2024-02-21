let event_list = [];
let current_talking_to = 'jhwnag2';
let	user = new Chat('jhwang2', [['seokjyoo', 'hello', './img/character1.jpg', '3'], ['minsulee', 'hiiiiiii', './img/character2.jpg', '5'], ['semikim', 'byeeeeeee', './img/character3.jpg', ''], ['hyunwoju', 'see youuuuu', './img/character4.jpg', '']]); //서버에 채팅상대 리스트 요청;


// const socket = WebSocket('');

// socket.onmessage = function (e) {

// 	const message = JSON.parse(e.data);

// 	if (message == 'jhwang2')
// 		showMessageToRight(message);
// 	else
// 		showMessageToLeft(message);
// }

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
	body.classList.replace(body.classList[1].toString(), 'green');

	clearResult();
	clearEvent();

	showChatRoom();
}

function showChatRoom() {

	let div_chat_room = makeTag('div', ['id', 'chat-room'], ['class', 'chat-room']);

	for (var i = 0; i < user.talking_to.length; i++)
	{
		let button_individual_room = makeTag('button',  ['id', user.talking_to[i][0]], ['class', 'chat-room-button']);
		addListener(button_individual_room, 'click', openChattingRoom, {once : true});
		let div_individual_room = makeTag('div', ['class', 'chat-room-individual']);
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
	clearEvent();

	let	div_chat_option = makeTag('div', ['id', 'chat-option'], ['class', 'chat-option']);
	let button_chat_block = makeTag('button', ['id', 'block'], ['onclick', 'blockTalkingTo()']);
	let button_chat_non_block = makeTag('button', ['id', 'block'], ['onclick', 'nonBlockTalkingTo()']);
	let button_game_invite = makeTag('button', ['id', 'invite'], ['onclick', 'inviteTalkingTo()']);

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
	// div_chat_form.appendChild(div_chat_input);

	document.getElementById('result').appendChild(div_chat_form);
	document.getElementById('result').appendChild(div_chat_input);
	current_talking_to = id;
	console.log(current_talking_to);
	user.init();
}


//Live Chat
function Chat(name, talking_to) {
	this.name = name;
	this.talking_to = talking_to;
}

Chat.prototype.init = function() {
	event_list.push([document, 'keydown', Chat.prototype.sendMessage]);
	addListener(document, 'keydown', this.sendMessage);
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
		"name": user.getName(),
		"reciever": current_talking_to,
		"message": message,
	};

	console.log(data);

	// data_list_live_chat = [
	// 	{"talking_to",
	// 	"profile",
	// 	"last_message"},
	// 	"talking_to",
	// 	"profile",
	// 	"last_message"
	// 	"talking_to",
	// 	"profile",
	// 	"last_message"
	// ]

	// data_list = [{

	// 	"name": user.getName(),
	// 	"reciever": receiver,
	// 	"message": message,
	// },
	// {

	// 	"name": user.getName(),
	// 	"reciever": receiver,
	// 	"message": message,
	// },
	// {

	// 	"name": user.getName(),
	// 	"reciever": receiver,
	// 	"message": message,
	// }]
	// postData('POST', 'localhost:8000', data)
	// .then((data) => {this.showMessage(data);})
	// .catch((err) => {console.log(err);});

	const get_message = message;
	if (get_message.indexOf('left') == -1)
		this.showMessageToRight(message);
	else
		this.showMessageToLeft(message);
}

Chat.prototype.showMessageToLeft = function(message) {
	let div_chat = document.getElementById('chat');
	let div_chat_talking_to = makeTag('div', ['class', 'talking_to']);
	let div_individual_profile = makeTag('div', ['class', 'input-profile']);
	let img_individual_profile = makeTag('img', ['src', user.talking_to[0][2]], ['alt', 'hello']);
	let div_chat_message = makeTag('div', ['class', 'chat-box']);
	let div_chat_name = makeTag('p', ['class', 'name-format']);
	let p_message = makeTag('p', ['class', 'format']);

	div_individual_profile.appendChild(img_individual_profile);
	div_chat_name.innerHTML = current_talking_to;
	div_chat_message.appendChild(div_chat_name);
	p_message.innerHTML = message;
	div_chat_message.appendChild(p_message);

	div_chat_talking_to.appendChild(div_individual_profile);
	div_chat_talking_to.appendChild(div_chat_message);
	div_chat_talking_to.appendChild(makeTag('div'));
	div_chat.appendChild(div_chat_talking_to);

}

Chat.prototype.showMessageToRight = function(message) {
	let div_chat = document.getElementById('chat');
	let div_chat_sender = makeTag('div', ['class', 'sender']);
	let div_individual_profile = makeTag('div', ['class', 'input-profile']);
	let img_individual_profile = makeTag('img', ['src', user.talking_to[1][2]], ['alt', 'hello']);
	let div_chat_message = makeTag('div', ['class', 'chat-box']);
	let div_chat_name = makeTag('p', ['class', 'name-format']);
	let p_message = makeTag('p', ['class', 'chat-format']);

	div_individual_profile.appendChild(img_individual_profile);
	div_chat_name.innerHTML = user.getName();
	p_message.innerHTML = message;
	div_chat_message.appendChild(div_chat_name);
	div_chat_message.appendChild(p_message);

	div_chat_sender.appendChild(makeTag('div'));
	div_chat_sender.appendChild(div_chat_message);
	div_chat_sender.appendChild(div_individual_profile);
	div_chat.appendChild(div_chat_sender);
}


Chat.prototype.receiveMessage = function(data) {

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

async function getData(method, url, data) {
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

function clearEvent() {
	for (var i = 0; i < event_list.length; i++)
		removeListner (event_list[i][0], event_list[i][1], event_list[i][2]);
}

function changeColorToBlue() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'blue');

	clearResult();
	clearEvent();
}

function changeColorToRed() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'red');

	clearResult();
	clearEvent();
}

function changeColorToBlack() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'black');

	clearResult();
	clearEvent();
}

function changeColorToAqua() {
	let body = document.getElementById('body');
	body.classList.replace(body.classList[1].toString(), 'default');

	clearResult();
	clearEvent();
}