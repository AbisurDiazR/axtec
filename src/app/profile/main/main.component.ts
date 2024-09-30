import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AddressDialogComponent } from 'src/app/shared/address-dialog/address-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DEFAULT_PROFILE_PIC } from 'src/app/shared/data';
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
          photoURL: res.photoURL != undefined ? res.photoURL : DEFAULT_PROFILE_PIC
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

  deleteAddress(address: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmar',
        message: '¿Esta seguro que desea borrar la dirección?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para eliminar la dirección
        this.usersServices.deleteAddressById(address.id).then(() => {
          this.setUserId();
        });
      }
    });
  }

}
