import {Component} from 'angular2/core';
import {Header} from './Header/Header';
import {MainContent} from './MainContent/MainContent';
import {Navbar} from './NavBar/NavBar';
import {Chat} from './Chat/chat';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [Header, Navbar, MainContent,Chat],
    
})

@RouteConfig([
	{path: '/chat', name: 'Chat', component: Chat},
	
])


export class AppComponent { }
