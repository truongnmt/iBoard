import {Component} from 'angular2/core';
import {Header} from './Header/Header';
import {MainContent} from './MainContent/MainContent';
import {Navbar} from './NavBar/NavBar';
import {Plugins} from './Plugins/Plugins';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [Header, Navbar, MainContent],
    
})

// @RouteConfig([
// 	{path: '/Navbar/NavBar', name: 'NavBar', component: Navbar},
// 	{path: '/Header/Header', name: 'Header', component: Header},
// 	{path: '/MainContent/MainContent', name: 'MainContent', component: MainContent}
// ])


export class AppComponent { }
