import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {AdalService} from 'ng2-adal/core';
import {SecretService} from './services/secret.service';

import { AppComponent }  from './components/app.component';

import {routes} from './routers/app.router'
import {HomeComponent} from "./components/home.component";
import {WelcomeComponent} from "./components/welcome.component";
import {LoggedInGuard} from "./authentication/logged-in.guard";

@NgModule({
  imports:      [ BrowserModule, routes, FormsModule, HttpModule, JsonpModule],
  declarations: [ AppComponent, HomeComponent, WelcomeComponent ],
  providers: [AdalService, SecretService, LoggedInGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
