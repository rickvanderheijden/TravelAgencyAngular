import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  editUsername = false;
  editFirstName = false;
  editLastName = false;
  editEmailAddress = false;
  userUpdated = false;

  // Sections
  showUserInformationSection = true;
  showGroupSection = false;
  showTripsSection = false;
  showBookingSection = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  saveUser() {
    this.editLastName = false;
    this.editFirstName = false;
    this.editUsername = false;
    this.editEmailAddress = false;
    this.userUpdated = true;
  }

  toggleEditUsername() {
    this.editUsername = !this.editUsername;
    this.editFirstName = false;
    this.editLastName = false;
    this.editEmailAddress = false;
  }

  toggleEditFirstName() {
    this.editFirstName = !this.editFirstName;
    this.editUsername = false;
    this.editLastName = false;
    this.editEmailAddress = false;
  }

  toggleEditLastName() {
    this.editLastName = !this.editLastName;
    this.editFirstName = false;
    this.editUsername = false;
    this.editEmailAddress = false;
  }

  toggleEditEmail() {
    this.editEmailAddress = !this.editEmailAddress;
    this.editFirstName = false;
    this.editLastName = false;
    this.editUsername = false;
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe((user: User) => {
      this.user = user;
      this.userUpdated = false;
      swal('succes', 'Wijzigingen succesvol opgeslagen', 'success');
    });
  }

  showSection(section) {
    this.showUserInformationSection = section === 'about';
    this.showGroupSection = section === 'groups';
    this.showTripsSection = section === 'trips';
    this.showBookingSection = section === 'bookings';
  }
}
