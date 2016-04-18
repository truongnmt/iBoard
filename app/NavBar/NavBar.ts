import {Component} from 'angular2/core';

@Component({
	selector:'navbar',
	templateUrl: 'app/NavBar/NavBar.html',
	styleUrls:['app/NavBar/NavBar.css']
})

export class Navbar {
	private open = 1;
	public NavBarTrigger(){

	}
	constructor()
	{
		console.log(this.open);
	}
}