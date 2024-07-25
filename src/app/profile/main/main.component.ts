import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AddressDialogComponent } from 'src/app/shared/address-dialog/address-dialog.component';
import { Address } from 'src/app/utils/address';
import { Order } from 'src/app/utils/order';
import { User } from 'src/app/utils/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentUserId: string = '';
  userAddresses: Address[] = [];
  currentUser: User = {
    displayName: '',
    email: '',
    password: '',
    id: '',
    phone: '',
    photoURL: ''
  };
  orders:Order[] = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usersServices: UsersService
  ) { }

  ngOnInit() {
    this.setUserId();
  }

  getAddresses(currentUserId: string) {
    this.userAddresses = [];
    this.usersServices.getAddresses(currentUserId).subscribe((res) => {
      res.forEach((element: Address) => {
        this.userAddresses.push(element);
      });
    });
  }

  setUserId() {
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      if (res != undefined) {
        this.currentUser = {
          displayName: res.displayName != undefined ? res.displayName : '',
          email: res.email != undefined ? res.email : '',
          password: '',
          id: res.uid,
          phone: res.phoneNumber != undefined ? res.phoneNumber : '',
          photoURL: res.photoURL != undefined ? res.photoURL : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
        };
      }
      this.getAddresses(this.currentUserId);
    });
  }

  newAddress() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '350px',
      height: 'fit-content',
      panelClass: 'axtec-dialog-border',
      data: { uuid: this.currentUserId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses(this.currentUserId);
    });
  }

}
