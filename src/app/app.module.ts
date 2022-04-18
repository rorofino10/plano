import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ViewerComponent } from './viewer/viewer.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from '@circlon/angular-tree-component';
import { EventEmitter, Stream } from 'stream';
import { FilterPipe } from './filter.pipe';
import { NgxColorsModule } from 'ngx-colors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ViewerComponent,
    StartscreenComponent,
    FilterPipe
  ],
  imports: [
    BrowserAnimationsModule,
    NgxColorsModule,
    TreeModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ToolbarComponent, ViewerComponent, AppComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
