import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";
import { MapComponent } from './map/map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BarListComponent } from './bar-list/bar-list.component';
import {AngularFireDatabaseModule} from "angularfire2/database";
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from "angularfire2/auth";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchBarComponent,
    BarListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0wFWovTu0l6viLmcHHNoAu0HACusASVI'
    }),
    AgmSnazzyInfoWindowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule // TODO - remove
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
