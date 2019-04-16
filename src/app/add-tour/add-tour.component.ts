import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { Marker } from '../models/map';
import { TourService } from '../services/tour.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'add-tour',
    templateUrl: './add-tour.component.html',
    styleUrls: ['./add-tour.component.css'],
})
export class AddTourComponent implements OnInit {

    // public editorValueContent: string = ''; // Two-way binding value
    files = [];
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


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient,
        private tourService: TourService,
        private location: Location
    ) {
        // this.invalidDateTime.setHours(this.invalidDateTime.getHours() + 7);
    }

    ngOnInit() {
        this.tourForm = this.formBuilder.group({
            Name: [''],
            Description: [''],
            Content: [''],
            Date: [''],
            Category: ['', Validators.required],
            City: ['', Validators.required],
            Address: [''],
            Image: [''],
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



        // // STORE THE FILE OBJECT IN AN ARRAY.
        // for (var i = 0; i < 5; i++) {
        //     this.tourForm.value.Image.push(this.tourForm.value.Image[i]);
        // }
        // console.log(this.tourForm.value.Image);


        this.tourService.addTour2(this.tourForm.value.Name, this.tourForm.value.Description,
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

