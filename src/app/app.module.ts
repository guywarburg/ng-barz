import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";
import { MapComponent } from './map/map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BarListComponent } from './bar-list/bar-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchBarComponent,
    BarListComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0wFWovTu0l6viLmcHHNoAu0HACusASVI'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
