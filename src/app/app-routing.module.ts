import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { ViewerComponent } from './viewer/viewer.component'

const routes: Routes = [
  {path: '', redirectTo: "/start", pathMatch: 'full'},
  { path: 'start', component: StartscreenComponent},
  { path: 'plano/:id', component: ViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
