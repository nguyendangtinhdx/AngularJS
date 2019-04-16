import { Component, OnInit } from '@angular/core';

import { Tour } from '../models/tour';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours: Tour[];

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getTours()
      .subscribe(tours => this.tours = tours);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tourService.addTour(name)
      .subscribe(tour => {
        this.tours.push(tour);
      });
  }

  delete(tour: Tour): void {
    this.tourService.deleteTour(tour)
      .subscribe(() => {
        this.tours = this.tours.filter(h => h !== tour);
      });
  }

}
