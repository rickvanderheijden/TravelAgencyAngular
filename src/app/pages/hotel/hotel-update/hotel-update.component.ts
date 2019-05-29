import {Component, OnInit, TemplateRef} from '@angular/core';
import {HotelService} from '../../../services/hotel.service';
import {Hotel} from '../../../../models/hotel';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';

@Component({
  selector: 'app-hotel-update',
  templateUrl: './hotel-update.component.html',
  styleUrls: ['./hotel-update.component.scss']
})
export class HotelUpdateComponent implements OnInit {
  hotelUpdateForm: FormGroup;
  hotel: Hotel;
  hotelId: any;
  loading = false;
  dbTripItems: Array<TripItem>;
  selectedTripItems: Array<any>;

  constructor(
    private hotelService: HotelService,
    private tripItemService: TripItemService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.tripItemService.getTripItems().subscribe((hotelItems: any) => {
      this.dbTripItems = hotelItems;
      this.hotelService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.hotel = new Hotel(data);
        this.hotelId = this.route.snapshot.params.id;
        this.setForm();
        this.loading = false;
      });
    });
  }

  updateHotel() {
    if (this.hotel) {
      this.hotelService.updateHotel(this.hotel).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/hotel/']);
  }

  setForm() {
    this.hotelUpdateForm = new FormGroup({
      name: new FormControl(this.hotel.name, [Validators.minLength(4), Validators.required]),
      imageBlob: new FormControl(this.hotel.imageBlob),
      address: new FormControl(this.hotel.address),
      description: new FormControl(this.hotel.description)

    });
    this.formBuilder.group(this.hotelUpdateForm);

  }

  get desinations() {
    return this.formBuilder.group({
      hotelName: '',
      hotelItems: this.formBuilder.array([this.hotelItems])
    });
  }

  get hotelItems() {
    return this.formBuilder.group({
      hotelItemName: ''
    });
  }

  addHotel() {
    (this.hotelUpdateForm.get('hotels') as FormArray).push(this.hotelItems);
  }

}
