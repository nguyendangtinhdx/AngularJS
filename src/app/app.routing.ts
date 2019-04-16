import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { ToursComponent }      from './tours/tours.component';
import { TourDetailComponent }  from './tour-detail/tour-detail.component';
import { AddTourComponent } from './add-tour/add-tour.component';
import { UpdateTourComponent } from './update-tour/update-tour.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-tour', component: AddTourComponent },
  { path: 'update-tour/:id', component: UpdateTourComponent },
  { path: 'tour-detail/:id', component: TourDetailComponent },
  { path: 'tours', component: ToursComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
