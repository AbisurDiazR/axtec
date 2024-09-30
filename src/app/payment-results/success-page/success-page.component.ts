import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/home/constants/product';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UsersService } from 'src/app/services/users.service';
import { AddressDialogComponent } from 'src/app/shared/address-dialog/address-dialog.component';
import { EMAIL_REGEX, PHONE_REGEX } from 'src/app/shared/data';
import { Address } from 'src/app/utils/address';
import { Sale } from 'src/app/utils/sale';
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

  currentDate = new Date();
  shippingAddress: string = '';
  orderItems: Product[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price'];  
  contactUser: User = { email: '', password: '', phone: '', displayName: '' };
  orderTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setContactForm();
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      this.getAddresses(this.currentUserId);
      this.setItems(this.currentUserId);
      this.contactUser = {
        email: res?.email ? res.email : '',
        password: '',
        phone: res?.phoneNumber ? res.phoneNumber : '',
        displayName: res?.displayName ? res.displayName : ''
      };
      console.log(this.contactUser);
      this.populateContactForm(this.contactUser);
    });
    this.route.queryParams.subscribe(params => {
      this.queryParamsJson = this.convertToJson(params);
      console.log(this.queryParamsJson);
    });
  }
  
  setItems(currentUserId: string) {
    this.purchaseService.getTemporalPurchase(currentUserId).subscribe((res) => {
      res.forEach((product: any) => {
        this.orderItems.push({
          titulo: product.title,
          cantidad: product.quantity,
          precio: product.unit_price,
          idPublisher: product.publisher,
          imagen: product.productImage
        })
      });
      this.orderTotal = this.orderItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
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
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
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
    this.shippingAddress = `${address.street} ${address.externalNumber} ${address.internalNumber}, ${address.city}, CP: ${address.zip}, ${address.country}`;
  }

  setPhone(){
    this.contactUser.phone = this.contactForm.controls['phone'].value;
  }

  finishPurchase(){
    let newSale: Sale = {
      cardholderName: this.contactUser.displayName ? this.contactUser.displayName : '',
      clientId: this.currentUserId,
      collection_id: this.queryParamsJson.collection_id,
      collection_status: this.queryParamsJson.collection_status,
      dateSale: this.currentDate.toDateString(),
      merchant_order_id: this.queryParamsJson.merchant_order_id,
      payment_id: this.queryParamsJson.payment_id,
      payment_type: this.queryParamsJson.payment_type,
      preference_id: this.queryParamsJson.preference_id,
      processing_mode: this.queryParamsJson.processing_mode,
      products: this.orderItems,
      shippingAddress: this.shippingAddress,
      shippingInfo: {
        estimatedDeliveryDate: '',
        trackingNumber: ''
      },
      contact: this.contactForm.value,
      site_id: this.queryParamsJson.site_id,
      status: this.queryParamsJson.status,
      total: this.orderTotal
    };
    this.purchaseService.createSale(newSale).then(() => {
      this.purchaseService.deleteTemporalPurchase(this.currentUserId).then(() => {
        this.usersService.deleteCartItems(this.currentUserId).then(() => {
          this.router.navigate(['profile/new-orders']);
        }).catch(() => {
          this.router.navigate(['profile/new-orders']);
        })
      })
    });
  }
}
