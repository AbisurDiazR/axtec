import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ZIP_CODE_REGEX } from '../data';
import { Address } from 'src/app/utils/address';
import { UsersService } from 'src/app/services/users.service';
import { NgxGpAutocompleteDirective } from '@angular-magic/ngx-gp-autocomplete';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  addressForm: any;
  public options = {
    componentRestrictions: { country: 'MX' }
  }

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private addressService: UsersService
  ) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      colonia: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(ZIP_CODE_REGEX)]],
      ciudad: ['', Validators.required],
      estado: ['', Validators.required],
      pais: [{ value: 'México', disabled: true }, Validators.required]
    });
  }

  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    if (place.adr_address) {
      let jsonAddress: any = this.parseAdrAddress(place.adr_address);
      jsonAddress['street-address'] != undefined ? this.addressForm.controls['calle'].setValue(jsonAddress['street-address']) : this.addressForm.controls['calle'].setValue('');
      jsonAddress['region'] != undefined ? this.addressForm.controls['estado'].setValue(jsonAddress['region']) : this.addressForm.controls['estado'].setValue('');
      jsonAddress['extended-address'] != undefined ? this.addressForm.controls['colonia'].setValue(jsonAddress['extended-address']) : this.addressForm.controls['colonia'].setValue('');
      jsonAddress['locality'] != undefined ? this.addressForm.controls['ciudad'].setValue(jsonAddress['locality']) : this.addressForm.controls['ciudad'].setValue('');
      jsonAddress['postal-code'] != undefined ? this.addressForm.controls['codigoPostal'].setValue(jsonAddress['postal-code']) : this.addressForm.controls['codigoPostal'].setValue('');
    }
  }

  submitAddress() {
    var newAddress: Address = {
      city: this.addressForm.controls['ciudad'].value,
      clientId: this.data.uuid,
      country: this.addressForm.controls['pais'].value,
      externalNumber: this.addressForm.controls['numeroExterior'].value,
      internalNumber: this.addressForm.controls['numeroInterior'].value,
      locality: this.addressForm.controls['colonia'].value,
      state: this.addressForm.controls['estado'].value,
      street: this.addressForm.controls['calle'].value,
      zip: this.addressForm.controls['codigoPostal'].value
    };
    this.addressService.createAddress(newAddress).then((res) => {
      this.toastrService.success('Nueva dirección creada', '¡Registro exitoso!', {
        timeOut: 10000,
        positionClass: 'toast-top-right'
      });
      this.dialogRef.close();
    }).catch((err) => {
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  parseAdrAddress(adrAddress: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(adrAddress, 'text/html');

    const spans = doc.querySelectorAll('span');

    const addressJson: { [key: string]: string } = {};

    spans.forEach(span => {
      const className = span.className;
      const value = span.textContent || '';
      addressJson[className] = value;
    });

    return addressJson;
  }
}
