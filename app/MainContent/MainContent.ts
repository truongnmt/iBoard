import {Component} from 'angular2/core';

@Component({
	selector:'content',
	templateUrl: 'app/MainContent/content.html',
// 	template:`
// 	<table border="1">
// 	<tr>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 	</tr>
// 	<tr>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 	</tr>
// 	<tr>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 		<td class="Square">X</td>
// 	</tr>
// </table>
// 	`
	styleUrls: ['app/MainContent/content-style.css'],
})

export class MainContent{
	public message = '';
	private turn = 'X';
	constructor(){
		this.turn = "X";
	}
	public nextMove(){
		this.message1 = turn;
	}
}