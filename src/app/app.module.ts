import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app.routing';

import { AppComponent }         from './app.component';
import { HomeComponent }   from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TourDetailComponent }  from './tour-detail/tour-detail.component';
import { ToursComponent }      from './tours/tours.component';
import { TourSearchComponent }  from './tour-search/tour-search.component';
import { AddTourComponent } from './add-tour/add-tour.component';
import { UpdateTourComponent } from './update-tour/update-tour.component';

import { TourService }          from './services/tour.service';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { FetchJsonPipe } from './services/fetch-json.pipe';
import { GrdFilterPipe } from './services/tour-filter.pipe'; // search
import { NgxPaginationModule } from 'ngx-pagination'; // pagination
import { CKEditorModule } from 'ngx-ckeditor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'tour-of-travel' }),
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw' //  AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ToursComponent,
    TourDetailComponent,
    TourSearchComponent,
    AddTourComponent,
    UpdateTourComponent,
    FetchJsonPipe,
    GrdFilterPipe
  ],
  providers: [ TourService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
