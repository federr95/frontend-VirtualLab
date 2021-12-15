import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './HomeComponent';
import { PageNotFoundComponent } from './PageNotFoundComponent';
import { StudentsContComponent } from './teacher/students-cont.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teacher',
      children: [
      { path: 'course/applicazioni-internet/students', component: StudentsContComponent /*canActivate: [AuthGuard]*/ },
      /*{ path: 'course/applicazioni-internet/vms', component: VmsContComponent, canActivate: [AuthGuard] },*/
    ]},
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
