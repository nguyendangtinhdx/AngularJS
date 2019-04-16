import { Component, OnInit } from "@angular/core";
import { Tour } from "../models/tour";
import { TourService } from "../services/tour.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit() {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getTours().subscribe(tours => (this.tours = tours));
  }

  delete(tour: Tour): void {
    if (confirm("Are you sure you want to delete?")) {
      this.tourService.deleteTour(tour).subscribe(() => {
        this.tours = this.tours.filter(h => h !== tour);
      });
    }
  }
}
