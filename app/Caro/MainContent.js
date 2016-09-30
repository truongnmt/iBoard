System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var square, MainContent, TABLE;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            square = (function () {
                function square() {
                }
                return square;
            }());
            exports_1("square", square);
            MainContent = (function () {
                function MainContent() {
                    this.table = TABLE;
                }
                MainContent.prototype.startGame = function () {
                    for (var i = 0; i < 9; i++) {
                        this.table[i].value = '';
                    }
                    this.turn = "X";
                    if (Math.random() < 0.5) {
                        this.turn = "O";
                    }
                    this.winner = null;
                    this.setMessage(this.turn + " gets to Start");
                };
                MainContent.prototype.setMessage = function (msg) {
                    document.getElementById("message").innerText = msg;
                };
                MainContent.prototype.nextMove = function (square) {
                    if (this.turn == null)
                        this.startGame();
                    if (this.winner != null) {
                        this.setMessage(this.winner + ' already won the game.');
                    }
                    else if (square.value == '') {
                        square.value = this.turn;
                        this.switchTurn();
                    }
                    else
                        this.setMessage("this square have used");
                };
                MainContent.prototype.switchTurn = function () {
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
                };
                MainContent.prototype.checkForWinner = function (move) {
                    var result = false;
                    if (this.checkRow(0, 1, 2, move) ||
                        this.checkRow(3, 4, 5, move) ||
                        this.checkRow(6, 7, 8, move) ||
                        this.checkRow(0, 3, 6, move) ||
                        this.checkRow(1, 4, 7, move) ||
                        this.checkRow(2, 5, 8, move) ||
                        this.checkRow(0, 4, 8, move) ||
                        this.checkRow(2, 4, 6, move)) {
                        result = true;
                    }
                    return result;
                };
                MainContent.prototype.checkRow = function (a, b, c, move) {
                    var result = false;
                    if (this.table[a].value == move && this.table[b].value == move && this.table[c].value == move) {
                        result = true;
                    }
                    return result;
                };
                MainContent = __decorate([
                    core_1.Component({
                        selector: 'content',
                        templateUrl: 'app/MainContent/content.html',
                        styleUrls: ['app/MainContent/content-style.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], MainContent);
                return MainContent;
            }());
            exports_1("MainContent", MainContent);
            TABLE = [
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
        }
    }
});
//# sourceMappingURL=MainContent.js.map