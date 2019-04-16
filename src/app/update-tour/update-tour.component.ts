import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { Marker } from '../models/map';
import { TourService } from '../services/tour.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Tour } from '../models/tour';

@Component({
    selector: 'update-tour',
    templateUrl: './update-tour.component.html',
    styleUrls: ['./update-tour.component.css'],
})
export class UpdateTourComponent implements OnInit {

    // public editorValueContent: string = ''; // Two-way binding value
    // ID: number = 1;
    // Name: string = 'Hội An';
    // Description: string = 'Phố cổ';
    // Content: string = 'Miền trung';

    // google maps zoom level
    zoom: number = 5;

    // initial center position for the map
    lat: number = 16.047079;
    lng: number = 108.206230;

    mapClicked($event: MouseEvent) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }

    markers: Marker[] = [
        {
            lat: 21.028511,
            lng: 105.804817,
            label: 'A',
            draggable: false
        },
        {
            lat: 16.047079,
            lng: 108.206230,
            label: 'B',
            draggable: true
        },
        {
            lat: 10.762622,
            lng: 106.660172,
            label: 'C',
            draggable: true
        }
    ]

    public min = new Date();
    public max = new Date(2030, 1, 1, 12, 30);
    public invalidDateTime = new Date();

    tourForm: FormGroup;
    loading = false;
    submitted = false;
    categorys = ['Du lịch', 'Chăm sóc khách hàng', 'Khuyến mãi'];

    tour: Tour;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private tourService: TourService,
        private location: Location
    ) {
        // this.invalidDateTime.setHours(this.invalidDateTime.getHours() + 7);
    }

    ngOnInit() {
        this.tourForm = this.formBuilder.group({
            ID: [''],
            Name: [''],
            Description: [''],
            Content: [''],
            Date: [''],
            Category: ['Du lịch'],
            City: ['Cao Bằng'],
            Address: [''],
            Image: [''],
        });
        this.getTour();
    }

    getTour(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.tourService.getTour(id)
            .subscribe(tour => {
                this.tour = tour;
                this.tourForm.controls['Category'].setValue(tour.category);
                this.tourForm.controls['City'].setValue(tour.city);
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.tourForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.tourForm.invalid) {
            return;
        }

        this.loading = true;

        // var formatDate = new Date(this.tourForm.value.Date);
        // formatDate.setHours(formatDate.getHours() + 7);

        if (this.tourForm.value.Image == "") {
            var formatLinkImage = "../../assets/img/vinh-ha-long.jpg";
        } else {
            var linkImageDefault = "../../assets/img/";
            var subLinkImage = this.tourForm.value.Image.substring(12);
            var formatLinkImage = linkImageDefault + subLinkImage;
        }
        this.tourService.updateTour2(this.tourForm.value.ID, this.tourForm.value.Name, this.tourForm.value.Description,
            this.tourForm.value.Content, this.tourForm.value.Date, this.tourForm.value.Category,
            this.tourForm.value.City, this.lat + ", " + this.lng, formatLinkImage)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    this.loading = false;
                });
    }

    goBack(): void {
        this.location.back();
    }
}

