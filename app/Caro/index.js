
var x = '<i class="fa fa-times"></i>';
var o = '<i class="fa fa-circle-o"></i>';
var DIRECT = {D: {x: 1, y: 0} , T: {x: -1, y: 0}, L: {x: 0, y: -1}, R: {x: 0, y: 1},
					TR: {x: -1, y: 1} , DR: {x: 1, y: 1}, TL: {x: -1, y: -1}, DL: {x: 1, y: -1}};
var X_STAGE = 1;
var O_STAGE = 2;
var CURR_STAGE = X_STAGE;
var curr = x;
var board = [];
var STATES = {INIT: 1, WAITING: 2, X_TURN: 3, O_TURN: 4, END: 5};
var GAME_STATE;

var players = new Array();
var socket = io();

for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}

window.onload = function(){
	
}

function initGame() {
	genBoard();
	GAME_STATE = STATES.INIT;
	loadGame();
}

function changeStage() {
	switch (GAME_STATE) {
		case STATES.INIT:
			GAME_STATE++;
			break;
		case STATES.WAITING:
			GAME_STATE++;
			break;
		case STATES.X_TURN:
			GAME_STATE = STATES.O_TURN;
			break;
		case STATES.O_TURN:
			GAME_STATE = STATES.X_TURN;
			break;
	}
	
	loadGame();
}

function loadGame() {
	switch (GAME_STATE) {
		case STATES.INIT:
			$('#start-panel').css('display', 'block');
			$('#btnStart').click(function() {
				// var participant = gapi.hangout.getParticipantById(gapi.hangout.getParticipantId());
				// var person_id = participant.person.id;
				// gapi.hangout.data.setValue('join_game', person_id);
				// console.log('[DEBUG] players join with id', person_id);
				changeStage();
			});
			break;
		case STATES.WAITING:
			$('#start-panel').css('display', 'none');
			$('#wait-panel').css('display', 'block');
			break;
		case STATES.X_TURN:
		case STATES.O_TURN:
			$('#wait-panel').css('display', 'none');
			$('#end-panel').css('display', 'none');
			break;
		case STATES.END:
			$('#end-panel').css('display', 'block');
			$('#btnReset').click(function() {
				console.log('reset nao');
				// gapi.hangout.data.setValue("resetGame", "play new game");
				resetGame();
			});
			break;
	} 
}

function resetGame() {
	clearBoard();
	curr = x;
	CURR_STAGE = X_STAGE;
	GAME_STATE = STATES.X_TURN;
	loadGame();
}

function getCell(id, top, left) {
	return '<input id="'+id+'" type="radio"/><label style="top: '+top+'; left: '+left+'" for="'+id+'"><span></span></label>';
}

function clearBoard() {
	for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}
	$('label span').empty();
	for (var i = 0; i < $('input[type="radio"]').length; i++){
		$('input[type="radio"]')[i].checked = false;
	}
}

function bit(pos) {
	// var participant = gapi.hangout.getParticipantById(gapi.hangout.getParticipantId());

	if (board[pos.x][pos.y] != 0) return;
	
	var id = pos.x + "-" + pos.y;
	board[pos.x][pos.y] = CURR_STAGE;
	$('input[id="' + id + '"]')[0].checked = true;
	$('label[for="' + id + '"] span').append(curr);
	if (checkWin(pos)) {
	 		console.log(CURR_STAGE + " win");
	 		GAME_STATE = STATES.END;
			loadGame();
	 	}
	next();
}

function genBoard() {
	var row = 10;
	var col = 10;
	var margin = 4;
	var cell_width = cell_height = 40;
	
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			var id = i + "-" + j;
			var top = cell_height * i + margin * i;
			var left = cell_width * j + margin * j;
			$('.tic-tac-toe').append(getCell(id, top, left));
		}
	}

	socket.on('caroPlay',function(posX,posY){
		if (board[posX][posY] != 0) return;

		console.log('socket caroPlay:', posX, posY);
		query = "label[for=\""+posX+"-"+posY+"\"]";
		var current = $(query);
		var pos = {x:posX,y:posY};
		
    	$(query).children('span').append(curr);
		$(query).trigger("click");
	})

	$('label').click(function() {
	 	var pos = getPos($(this));
	 	// var participant = gapi.hangout.getParticipantById(gapi.hangout.getParticipantId());
	 	if (board[pos.x][pos.y] != 0) return;
	 	// if ((CURR_STAGE == X_STAGE && participant.person.id != players[0]) ||
	 	// 	(CURR_STAGE == O_STAGE && participant.person.id != players[1])) {

	 	// 	setTimeout(function() {
	 	// 		console.log('DANH SAI LUOT');
			// 	var pos_id = pos.x + "-" + pos.y;
		 // 		$('input[id="'+pos_id+'"]')[0].checked = false;
	 	// 	}, 500);
	 		
	 	// 	return;
	 	// }
	 		

	 	board[pos.x][pos.y] = CURR_STAGE;
	 	socket.emit("caroPlay",pos.x,pos.y);
	 	
	 	// gapi.hangout.data.setValue('bit', JSON.stringify(pos));

	 	if (checkWin(pos)) {
	 		console.log(CURR_STAGE + " win");
	 		GAME_STATE = STATES.END;
			loadGame();
	 	}
	 	next();
	});
	$('label').hover(function(){
		var pos = getPos($(this));
		if (board[pos.x][pos.y] == 0)
	    	$(this).children('span').append(curr);
	}, function() {
		var pos = getPos($(this));
		if (board[pos.x][pos.y] == 0)
			$(this).children('span').empty();
	});

}

function next() {
	if (curr == x) {
		curr = o;
		CURR_STAGE = O_STAGE;
	}
	else {
		curr = x;
		CURR_STAGE = X_STAGE;
	}
}

function getPos(obj) {
	var pos = obj.attr("for").split('-');
	return {x: pos[0], y: pos[1]};
}

function canGo(a, b) {
	if (a.x < 0 || a.y < 0 || b.x < 0 || b.y < 0) return false;
	if (a.x > 9 || a.y > 9 || b.x > 9 || b.y > 9) return false;
	return board[a.x][a.y] == board[b.x][b.y];
}

function posPlus(a, b) {
	return {x: (Number(a.x) + Number(b.x)), y: (Number(a.y) + Number(b.y))}
}

function clonePos(obj) {
	return {x: obj.x, y: obj.y};
}

function checkPoint(pos, direct) {
	var point = 0;
	var tempPos = clonePos(pos);

	while( canGo(tempPos,posPlus(tempPos, direct)) ){
		point++;
		tempPos = posPlus(tempPos, direct);
	}
	return point;
}

function checkTD(pos) {
	var point = 0;
	point += checkPoint(pos, DIRECT.D);					
	point += checkPoint(pos, DIRECT.T);	
	//console.log('[DEBUG] Top Down point = ', point);
	return (point == 4);
}

function checkLR(pos) {
	var point = 0;
	point += checkPoint(pos, DIRECT.L);					
	point += checkPoint(pos, DIRECT.R);	
	//console.log('[DEBUG] Top Down point = ', point);
	return (point == 4);
}

function checkTL_RD(pos){
	var point = 0;
	point += checkPoint(pos, DIRECT.TL);					
	point += checkPoint(pos, DIRECT.DR);	
	//console.log('[DEBUG] Top Down point = ', point);
	return (point == 4);
}

function checkDL_TR(pos) {
	var point = 0;
	point += checkPoint(pos, DIRECT.DL);					
	point += checkPoint(pos, DIRECT.TR);	
	//console.log('[DEBUG] Top Down point = ', point);
	return (point == 4);
}

function checkWin(pos) {
	if (checkTD(pos)) {
		return true;
	} else if (checkLR(pos)) {
		return true;
	} else if (checkDL_TR(pos)) {
		return true;
	} else if (checkTL_RD(pos)) {
		return true;
	} else {
		return false;
	}
}

// function stateChanged(StateChangedEvent) {
//   	var added_keys = StateChangedEvent.addedKeys;

//     console.log("Added Keys 0: " + JSON.stringify(added_keys[0]));
  
//   	if (added_keys[0].key == 'game_start') { 
//   		if (CURR_STAGE == STATES.X_TURN) return;
//   		changeStage();
//   		console.log('[DEBUG] state ', added_keys[0].value);
//   		console.log('[DEBUG] state == x : ', added_keys[0].value == STATES.X_TURN);
//   	}
// 	else if (added_keys[0].key == 'join_game') { 
// 		players[players.length] = added_keys[0].value;
// 		console.log('[DEBUG] state join: player length ', players.length);
//   		if (players.length == 2) {
// 			changeStage();
// 			gapi.hangout.data.setValue('game_start', String(STATES.X_TURN));
// 		}
//   	}
//   	else if (added_keys[0].key == 'bit') { 
//   		var pos = JSON.parse(added_keys[0].value);
//   		bit(pos);
//   	}
//   	else if (added_keys[0].key == 'resetGame') { 
//   		resetGame();
//   	}
// }

initGame();
setTimeout(function() {
	changeStage();
},2000);

// if (gapi && gapi.hangout) {
//    gapi.hangout.onApiReady.add(initGame);
//    gapi.hangout.data.onStateChanged.add(stateChanged);
// }





