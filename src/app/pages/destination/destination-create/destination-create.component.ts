import { Component, OnInit } from '@angular/core';
import { DestinationService} from '../../../services/destination.service';
import {Destination} from '../../../../models/destination';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GeographyService} from '../../../services/geography.service';
import {City} from '../../../../models/city';
import {Hotel} from '../../../../models/hotel';
import {TripItem} from '../../../../models/TripItem';
import {HotelService} from '../../../services/hotel.service';
import {TripItemService} from '../../../services/trip-item.service';

@Component({
  selector: 'app-destination-create',
  templateUrl: './destination-create.component.html',
  styleUrls: ['./destination-create.component.scss']
})
export class DestinationCreateComponent implements OnInit {
  destinationCreateForm: FormGroup;
  hotelForm: FormGroup;
  cityForm: FormGroup;
  tripItemsForm: FormGroup;
  destination: Destination;
  loading = false;
  private loaded = false;
  cities: City[];
  hotels: Hotel[];
  tripItems: TripItem[];

  constructor(
    private destinationService: DestinationService,
    private geoService: GeographyService,
    private hotelService: HotelService,
    private tripItemService: TripItemService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.destination = new Destination();
    this.geoService.getAllCities().subscribe( (response: City[]) => {
      this.cities =  response;
      this.setForm();
    });

  }

  enterDestination() {
    if (this.destination) {
      this.destinationService.createDestination(this.destination).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/destination/']);
  }


  setForm() {
    this.cityForm = this.formBuilder.group({
      name: this.formBuilder.control(this.destination.city.name, [Validators.required])
    });
    this.hotelForm = this.formBuilder.group({
      name: this.formBuilder.control({value: this.destination.hotel.name, disabled: true}, [Validators.required])
    });
    this.tripItemsForm = this.formBuilder.group({
      name: this.formBuilder.control({value: this.destination.tripItems, disabled: true}, [Validators.required])
    });

    this.destinationCreateForm = this.formBuilder.group({
      name: this.formBuilder.control(this.destination.name),
      city: this.formBuilder.control(this.destination.city, Validators.required),
      hotel: this.formBuilder.control({value: this.destination.hotel, disabled: true}, Validators.required),
      tripItems: this.formBuilder.control({value: this.destination.tripItems, disabled: true}, Validators.required),
    });
    this.loaded = true;
  }

  createDestination() {
    this.destination = new Destination(this.destinationCreateForm.value);
    console.log(this.destination);
    if (this.destinationCreateForm.valid) {
      this.destinationService.createDestination(this.destination).subscribe((response: any) => {
        this.router.navigate(['/destination']);
      });
    }

  }

  getHotelsAndTripItems(event) {
    this.tripItems = new Array<TripItem>();
    this.destinationCreateForm.get('hotel').setValue(null);
    this.destinationCreateForm.get('tripItems').setValue(null);
    if (event !== undefined) {
      this.hotelService.getHotelsByCity(event.name).subscribe((hotels: Array<Hotel>) => {
        this.hotels = hotels;
        this.destinationCreateForm.get('hotel').enable();
      });
      this.tripItemService.getTripItemsByCity(event.name).subscribe((tripItems: Array<TripItem>) => {
        this.tripItems = tripItems;
        this.destinationCreateForm.get('tripItems').enable();
      });
    }
  }
}
