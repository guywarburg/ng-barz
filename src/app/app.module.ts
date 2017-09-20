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
import {AngularFireAuthModule} from "angularfire2/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule, ProgressBarModule } from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BarDetailsComponent} from "./bar-details/bar-details.component";
import {MdSliderModule} from "@angular/material";
import { RankComponent } from './rank/rank.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchBarComponent,
    BarListComponent,
    BarDetailsComponent,
    RankComponent
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
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    MdSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
