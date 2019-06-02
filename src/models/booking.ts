import {BookingItem} from './bookingitem';
import {Travel} from './travel';
import {BookingItemType} from './bookingitemtype';
import {User} from './user';

export class Booking {

  public id: number;
  public tripId: number;
  public basePrice: number;
  public booker: User;
  public numberOfTravelers: number;
  public bookingItems: BookingItem[];

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.tripId = model.tripId;
      this.basePrice = model.basePrice;
      this.booker = model.booker;
      this.numberOfTravelers = model.numberOfTravelers;
      this.bookingItems = model.bookingItems;
    }
  }

  setPropertiesFromTravel(travel: Travel) {
    this.bookingItems = new Array();
    this.tripId = travel.trip.id;
    this.basePrice = travel.trip.totalPrice;

    this.numberOfTravelers = 4; //TODO Do not set to fixed value

    const bookingItemsToAdd = new Array<BookingItem>();

    travel.tripItems.forEach((tripItem) => {
      console.log('tripItemsForEach');
      const bookingItemType = new BookingItemType();
      bookingItemType.type = 'TripItem';

      const bookingItem = new BookingItem();
      bookingItem.type = bookingItemType;
      bookingItem.itemId = tripItem.id;
      bookingItem.description = tripItem.description;
      bookingItem.price = tripItem.price;
      bookingItem.numberOfAttendees = this.numberOfTravelers;
      bookingItemsToAdd.push(bookingItem);
    });

    travel.hotels.forEach((hotel) => {
      console.log('hotelsForEach');
      const bookingItemType = new BookingItemType();
      bookingItemType.type = 'Hotel';

      const bookingItem = new BookingItem();
      bookingItem.type = bookingItemType;
      bookingItem.itemId = hotel.id;
      bookingItem.description = hotel.description;
      bookingItem.price = hotel.price;
      bookingItem.numberOfAttendees = this.numberOfTravelers;
      bookingItemsToAdd.push(bookingItem);
    });

    this.bookingItems = bookingItemsToAdd;
  }

  getTotalPrice() {
    let totalPriceBooking = this.numberOfTravelers * this.basePrice;

    if (this.bookingItems !== null) {
      this.bookingItems.forEach(function (bookingItem) {
        totalPriceBooking += bookingItem.numberOfAttendees * bookingItem.price;
      });
    }

    return totalPriceBooking;
  }
}
