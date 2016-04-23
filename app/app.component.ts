import {Component} from 'angular2/core';
import {Header} from './Header/Header';
import {Caro} from './Caro/Caro';
import {Navbar} from './NavBar/NavBar';
import {Chat} from './Chat/chat';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [Header, Navbar, Caro, Chat],
    
})

@RouteConfig([
	{path: '/chat', name: 'Chat', component: Chat},
	
])


export class AppComponent { }
