function enterTournament() {
	let div_nick_name = makeTag('div', ['id', 'nickname-wrap'], ['class', 'nickname-wrap']);
	// let form_nick_name = makeTag('form', ['id', 'nickname-form'], ['class', 'nickname-form']);
	let input_nick_name = makeTag('input', ['id', 'nickname-input'], ['class', 'nickname-input'], ['type', 'text'], ['placeholder', 'Type Your Name']);
	let button_nick_name = makeTag('button', ['id', 'nickname-button'], ['class', 'nickname-button'], ['onclick', 'sendNickNameToServer()']);
	button_nick_name.innerHTML = 'Enter';
	div_nick_name.appendChild(input_nick_name);
	div_nick_name.appendChild(button_nick_name);
	// div_nick_name.appendChild(form_nick_name);
	document.getElementById('result').appendChild(div_nick_name);
	addListener(document, 'keydown', sendNickNameToServerEvent);
}

function sendNickNameToServerEvent(e) {
	if (e.keyCode == 13) {

		e.preventDefault();

		let msg = $('input.nickname-input').val();

		console.log(msg);

		clearInputArea();
		makeMessageTypeAndSend(msg);
	}
}

function sendNickNameToServer() {
	let msg = $('input.nickname-input').val();
	
	console.log(msg);
	
	clearInputArea();
	makeMessageTypeAndSend(msg);
}

// 추후 이미 연결된 소켓을 재사용 하기 때문에 새로 할당 필요 없음
function makeMessageTypeAndSend(msg) {
	
	// const socket = new WebSocket('url/tournament');
	
	// let msg = {
	// 	type: 'nickname',
	// 	name: 'jhwang2',
	// 	message: msg,
	// };

	// socket.send(JSON.stringify(msg));
	clearResult();
	showTournamentBracket(msg);
}

function showTournamentBracket(msg) {
	let div_bracket = makeTag('div', ['class', 'bracket']);
	let div_round = makeTag('div', ['class', 'round r-of-4']);
	let div_game;
	let div_player;

	for (var i = 0; i < 4; i++)
	{
		if (i == 0)
			div_game = makeTag('div', ['class', 'bracket-game']);
		else if (i == 2)
			div_game = makeTag('div', ['class', 'bracket-game cont']);

		if ((i % 2) == 0)
			div_player = makeTag('div', ['id', 'player' + i + 1], ['class', 'player top']);
		else
			div_player = makeTag('div', ['id', 'player' + i + 1], ['class', 'player bot']);

		let score = makeTag('div', ['id', 'score' + i + 1], ['class', 'score']);

		div_player.innerHTML = msg + (i*3);
		score.innerHTML = i + 1;
		div_player.appendChild(score);
		div_game.appendChild(div_player);
		if (i == 1 || i == 3)
			div_round.appendChild(div_game);
	}
	div_bracket.appendChild(div_round);
	document.getElementById('result').appendChild(div_bracket);
}

function clearInputArea() {
	document.getElementById('nickname-input').value = '';
}