import {Component} from 'angular2/core';
import {Header} from './Header/Header';
import {MainContent} from './MainContent/MainContent';
import {Navbar} from './NavBar/NavBar';
import {Plugins} from './Plugins/Plugins';
import {Chat} from './Chat/chat';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [Header, Navbar, MainContent,Plugins,Chat],
    
})

@RouteConfig([
	{path: '/Chat', name: 'Chat', component: Chat},
	
])


export class AppComponent { }
