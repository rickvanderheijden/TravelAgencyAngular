import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {City} from '../../../models/city';
import {GeographyService} from '../../services/geography.service';
import {Country} from '../../../models/country';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../../models/user';
import {Booking} from '../../../models/booking';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-booking-traveler-information',
  templateUrl: './booking-traveler-information.component.html',
  styleUrls: ['./booking-traveler-information.component.scss']
})
export class BookingTravelerInformationComponent implements OnInit {

  @Input()
  booking: Booking;

  @Output()
  formValid = new EventEmitter<boolean>();

  bookingTravelerInformationForm: FormGroup;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  travelersForm: FormGroup;
  travelers: FormArray;
  loaded = false;
  loading = false;
  countries: Country[];
  private cities: City[];
  currentUser: User;

  constructor(private geographyService: GeographyService, private userSev: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentUser = new User(JSON.parse(sessionStorage.getItem('currentUser')));
    this.countries = new Array<Country>();
    this.geographyService.getAllCountries().subscribe((countries: Array<Country >) => {
      countries.forEach((country) => {
        if (country.cities.length) {
          this.countries.push(new Country(country));
        }
      });

      this.geographyService.getAllCities().subscribe( (cities: City[]) => {
        this.cities =  cities;
        });

      this.setForm();

      this.bookingTravelerInformationForm.statusChanges
        .subscribe(() => { this.formValid.emit(this.bookingTravelerInformationForm.valid); });

      this.loaded = true;
    });
  }

  getCities(event: any) {
    this.cities = new Array();
    if (event !== undefined) {
      this.geographyService.getCitiesByCountryName(event.name).subscribe((cities: Array<City>) => {
        this.cities = cities;
        this.cityForm.get('name').enable();
      });
    }
  }

  clearCountryAndCity() {
    this.cities = null;
    const city = this.cityName;
    city.disable();
    city.setValue(null);
    this.countryForm.get('name').setValue(null);
  }

  getCountry(event: City) {
    this.geographyService.getCountryByCityName(event.name).subscribe( response => {
      this.booking.address.country = response;
      this.countryForm.get('name').setValue(response.name);
    });
  }

  get cityName() {
    return this.cityForm.get('name');
  }

  private setForm() {
    this.countryForm = this.formBuilder.group({
      name: this.formBuilder.control(this.booking.address.country.name, [Validators.required])
    });

    this.cityForm = this.formBuilder.group({
      name: this.formBuilder.control(this.booking.address.city.name, [Validators.required])
    }, );

    this.addressForm = this.formBuilder.group({
      addressLine: this.formBuilder.control(this.booking.address.addressLine, [Validators.required]),
      zipCode: this.formBuilder.control(this.booking.address.zipCode, [Validators.required]),
      city: this.cityForm,
      country: this.countryForm
    });

    this.travelersForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [ Validators.required] ),
      lastName: this.formBuilder.control('', [ Validators.required] ),
    });

    this.bookingTravelerInformationForm = this.formBuilder.group({
      firstName: this.formBuilder.control({value: this.currentUser.firstName, disabled: true}, [ Validators.required] ),
      lastName: this.formBuilder.control({ value: this.currentUser.lastName, disabled: true}, [ Validators.required] ),
      address: this.addressForm,
      travelers: this.formBuilder.array([])
    });

    for (let i = 1; i < this.booking.numberOfTravelers; i++) {
      this.addTraveler();
    }
  }

  private createTraveler(): FormGroup {
    return this.formBuilder.group({
      firstName: this.formBuilder.control('', [ Validators.required] ),
      lastName: this.formBuilder.control('', [ Validators.required] ),
    });
  }

  private addTraveler(): void {
    this.travelers = this.bookingTravelerInformationForm.get('travelers') as FormArray;
    this.travelers.push(this.createTraveler());
  }

  getFormValues() {
    return this.bookingTravelerInformationForm.value;
  }
}
