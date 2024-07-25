import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AddressDialogComponent } from 'src/app/shared/address-dialog/address-dialog.component';
import { EMAIL_REGEX } from 'src/app/shared/data';
import { Address } from 'src/app/utils/address';
import { User } from 'src/app/utils/user';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {
  queryParamsJson: any;
  isLinear: boolean = true;
  userAddresses: Address[] = [];
  currentUserId: string = '';
  addressSelected: boolean = false;
  contactForm: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setContactForm();
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      this.getAddresses(this.currentUserId);
      let contactUser: User = {
        email: res?.email ? res.email : '',
        password: '',
        phone: res?.phoneNumber ? res.phoneNumber : '',
        displayName: res?.displayName ? res.displayName : ''
      };
      this.populateContactForm(contactUser);
    });
    this.route.queryParams.subscribe(params => {
      this.queryParamsJson = this.convertToJson(params);
      console.log(this.queryParamsJson);
    });
  }
  
  populateContactForm(contactUser: User) {
    this.contactForm.controls['fullName'].setValue(contactUser.displayName);
    this.contactForm.controls['phone'].setValue(contactUser.phone);
    this.contactForm.controls['email'].setValue(contactUser.email);
  }

  setContactForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]]
    });
  }

  convertToJson(params: Params): any {
    const json: any = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        json[key] = params[key];
      }
    }
    return json;
  }

  getAddresses(currentUserId: string) {
    console.log(currentUserId);
    this.userAddresses = [];
    this.usersService.getAddresses(currentUserId).subscribe((res) => {
      res.forEach((element: Address) => {
        this.userAddresses.push({ selected: false, ...element });
      });
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

  selectAddress(address: Address) {
    this.userAddresses.forEach((element: Address) => {
      element.selected = false;
    });
    address.selected = true;
    address.selected ? this.addressSelected = true : this.addressSelected = false;
    console.log(this.addressSelected);
  }
}
