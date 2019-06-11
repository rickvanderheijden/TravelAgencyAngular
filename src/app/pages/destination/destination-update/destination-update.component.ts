import {Component, OnInit} from '@angular/core';
import {DestinationService} from '../../../services/destination.service';
import {Destination} from '../../../../models/destination';
import {ActivatedRoute, Router} from '@angular/router';
import {   FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';
import {City} from '../../../../models/city';
import {Hotel} from '../../../../models/hotel';
import {GeographyService} from '../../../services/geography.service';
import {HotelService} from '../../../services/hotel.service';

@Component({
  selector: 'app-destination-update',
  templateUrl: './destination-update.component.html',
  styleUrls: ['./destination-update.component.scss']
})
export class DestinationUpdateComponent implements OnInit {
  destinationUpdateForm: FormGroup;
  hotelForm: FormGroup;
  cityForm: FormGroup;
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.tripItemService.getTripItems().subscribe((destinationItems: any) => {
      this.tripItems = destinationItems;
      this.destinationService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.destination = new Destination(data);
        this.hotelService.getHotelsByCity(this.destination.city.name).subscribe((hotels: Array<Hotel>) => {
          this.hotels = hotels;
        });
        this.geoService.getAllCities().subscribe( (response: City[]) => {
          this.cities =  response;
          this.setForm();
          this.loading = false;
        });
      });
    });
  }

  updateDestination() {
    this.destination = new Destination(this.destinationUpdateForm.value);
    if (this.destination) {
      this.destinationService.updateDestination(this.destination).subscribe(
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

    this.destinationUpdateForm = this.formBuilder.group({
      id: this.destination.id,
      name: this.formBuilder.control(this.destination.name),
      city: this.formBuilder.control(this.destination.city, Validators.required),
      hotel: this.formBuilder.control(this.destination.hotel),
      tripItems: this.formBuilder.control(this.destination.tripItems)
    });
    this.loaded = true;
  }

  get formTripItems() {
    return this.formBuilder.group({
      tripItemName: ''
    });
  }

  getHotelsAndTripItems(event) {
    this.tripItems = new Array<TripItem>();
    this.destinationUpdateForm.get('hotel').setValue(null);
    this.destinationUpdateForm.get('tripItems').setValue(null);
    if (event !== undefined) {
      this.hotelService.getHotelsByCity(event.name).subscribe((hotels: Array<Hotel>) => {
        this.hotels = hotels;
        this.destinationUpdateForm.get('hotel').enable();
      });
      this.tripItemService.getTripItemsByCity(event.name).subscribe((tripItems: Array<TripItem>) => {
        this.tripItems = tripItems;
        this.destinationUpdateForm.get('tripItems').enable();
      });
    }
  }
}
