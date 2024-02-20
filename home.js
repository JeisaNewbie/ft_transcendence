let event_list = [];
let current_talking_to = 'jhwnag2';
let	user = new Chat('jhwang2', [['seokjyoo', 'hello'], ['minsulee', 'hiiiiiii'], ['semikim', 'byeeeeeee'], ['hyunwoju', 'see youuuuu']]); //서버에 채팅상대 리스트 요청;

// const socket = WebSocket('');

// socket.onmessage = function (e) {
// 	const message = JSON.parse(e.data);
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

	showChatRoom(user);
}

function showChatRoom(user) {

	let div_chat_room = makeTag('div', ['id', 'chat-room'], ['class', 'chat-room']);

	for (var i = 0; i < user.talking_to.length; i++)
	{
		let button_individual_room = makeTag('button',  ['id', user.talking_to[i][0]], ['class', 'chat-room-button']);
		addListener(button_individual_room, 'click', openChattingRoom, {once : true});
		let div_individual_room = makeTag('div', ['class', 'chat-room-individual']);
		let div_individual_profile = makeTag('div', ['class', 'input-profile']);
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
	chattingWithFriend(user, button.id);
}

function chattingWithFriend(user, id) {

	clearResult();
	clearEvent();
	let div_chat_form = makeTag('div', ['class', 'chat_wrap']);
	let div_chat = makeTag('div', ['class', 'chat']);
	let	ul_chatting = makeTag('ul', ['id', 'chatting']);
	let	div_chat_input = makeTag('div', ['class', 'input-div']);
	let textarea = makeTag('textarea', ['id', 'text-area'], ['placeholder', 'Press Enter for send message.']);

	div_chat.appendChild(ul_chatting);
	div_chat_input.appendChild(textarea);

	let	div_chat_format = makeTag('div', ['class', 'chat format']);
	let	ul_chat_format = makeTag('ul');
	let li_chat_format = makeTag('li');
	let div_chat_sender = makeTag('div', ['id', 'sender']);
	let span_chat_sender = makeTag('span');
	let div_chat_message = makeTag('div', ['class', 'message']);
	let span_chat_message = makeTag('span');

	div_chat_message.appendChild(span_chat_message);
	div_chat_sender.appendChild(span_chat_sender);
	li_chat_format.appendChild(div_chat_sender);
	li_chat_format.appendChild(div_chat_message);
	ul_chat_format.appendChild(li_chat_format);
	div_chat_format.appendChild(ul_chat_format);

	div_chat_form.appendChild(div_chat);
	div_chat_form.appendChild(div_chat_input);
	div_chat_form.appendChild(div_chat_format);

	document.getElementById('result').appendChild(div_chat_form);
	current_talking_to = id;
	console.log(current_talking_to);
	user.init(user);
}


//Live Chat
function Chat(name, talking_to) {
	this.name = name;
	this.talking_to = talking_to;
}

Chat.prototype.init = function(user) {
	event_list.push([document, 'keydown', Chat.prototype.sendMessage]);
	addListener(document, 'keydown', this.sendMessage);
}

Chat.prototype.sendMessage = function(e) {
	if (e.keyCode == 13) {

		e.preventDefault();

		let msg = $('div.input-div textarea').val();
		if (msg)
			Chat.prototype.sendMessageToServer(msg, user);
		else
			window.alert('Type message.');

		Chat.prototype.clearTextArea();
	}
}

Chat.prototype.sendMessageToServer = function(message, user) {

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
	postData('POST', 'localhost:8000', data)
	.then((data) => {this.showMessage(data);})
	.catch((err) => {console.log(err);});
}

Chat.prototype.receiveMessage = function() {

}

Chat.prototype.showMessage = function(data) {

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