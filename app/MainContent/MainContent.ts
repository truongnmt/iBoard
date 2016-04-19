import {Component} from 'angular2/core';

export class square {
	id: number;
	value: string;
}

@Component({
	selector: 'content',
	templateUrl: 'app/MainContent/content.html',
	styleUrls: ['app/MainContent/content-style.css']
})

export class MainContent {
	turn: string;
	winner: string;
	table = TABLE;

	startGame() {
		for (var i = 0; i < 9; i++) {
			this.table[i].value = '';
		}
		this.turn = "X";
		if (Math.random() < 0.5) {
			this.turn = "O";
		}
		this.winner = null;
		this.setMessage(this.turn + " gets to Start");
	}

	setMessage(msg) {
		document.getElementById("message").innerText = msg;
	}

	nextMove(square: square) {
		if (this.turn == null) this.startGame();
		if (this.winner != null) {
			this.setMessage(this.winner + ' already won the game.')
		}
		else if (square.value == '') {
			square.value = this.turn;
			this.switchTurn();
		}
		else this.setMessage("this square have used");
	}

	switchTurn() {
		if (this.checkForWinner(this.turn)) {
			this.setMessage("Congratulations, " + this.turn + " ! You win");
			this.winner = this.turn;
		}
		else if (this.turn == "X") {
			this.turn = "O";

			this.setMessage("It's " + this.turn + "'s turn!");
		}
		else {
			this.turn = "X";

			this.setMessage("It's " + this.turn + "'s turn!");
		}

	}

	checkForWinner(move) {
		var result = false;
		if (this.checkRow(0, 1, 2, move) ||
			this.checkRow(3, 4, 5, move) ||
			this.checkRow(6, 7, 8, move) ||
			this.checkRow(0, 3, 6, move) ||
			this.checkRow(1, 4, 7, move) ||
			this.checkRow(2, 5, 8, move) ||
			this.checkRow(0, 4, 8, move) ||
			this.checkRow(2, 4, 6, move)) 
		{
			result = true;
		}
		return result;
	}

	checkRow(a, b, c, move) {
		var result = false;
		if (this.table[a].value == move && this.table[b].value == move && this.table[c].value == move) {
			result = true;
		}
		return result;
	}
}

var TABLE: square[] = [
	{ "id": 1, "value": "" },
	{ "id": 2, "value": "" },
	{ "id": 3, "value": "" },
	{ "id": 4, "value": "" },
	{ "id": 5, "value": "" },
	{ "id": 6, "value": "" },
	{ "id": 7, "value": "" },
	{ "id": 8, "value": "" },
	{ "id": 9, "value": "" }
];