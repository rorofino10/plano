import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ViewerComponent } from './viewer/viewer.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ViewerComponent,
    StartscreenComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ToolbarComponent, ViewerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
