import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { ViewerComponent } from './viewer/viewer.component'

const routes: Routes = [
  { path: '', redirectTo: "/list", pathMatch: 'full'},
  { path: 'list', component: StartscreenComponent},
  { path: ':name', component: ViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
