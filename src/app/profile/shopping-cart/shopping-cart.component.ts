import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/home/constants/item';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UsersService } from 'src/app/services/users.service';
import { ItemCart } from 'src/app/utils/item-cart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  currentUserId: string = "";
  cartItems: ItemCart[] = [];
  cartItemsForm: any;

  constructor(
    private shoppingCartService: UsersService,
    private userService: AuthService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private purchaseService: PurchaseService
  ) {
    this.cartItemsForm = this.fb.group({
      items: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  get itemsFormArray(): FormArray {
    return this.cartItemsForm.get('items') as FormArray;
  }

  getShoppingCart() {
    this.cartItems = [];
      this.itemsFormArray.clear();
    this.userService.observerCurrentUser.subscribe((res: any) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';      
      this.shoppingCartService.getShoppingCartById(this.currentUserId).subscribe((res: any) => {
        console.log(res);
        if (res.length != 0 && this.cartItems.length === 0) {
          this.cartItems = res;
          this.cartItems.forEach(item => {
            this.itemsFormArray.push(this.createItemFormGroup(item));
          });
        }
      });
    });
  }

  createItemFormGroup(item: ItemCart): FormGroup {
    return this.fb.group({
      description: [item.description],
      id: [item.id],
      imagen: [item.imagen],
      precio: [item.precio],
      quantity: [item.quantity],
      titulo: [item.titulo]
    });
  }

  removeItemsNumber(productId: string, index: number) {
    const qtyProduct = this.itemsFormArray.at(index).value['quantity'];
    if (qtyProduct > 1) {
      this.shoppingCartService.updateShoppingCartItems(this.currentUserId, productId, qtyProduct - 1).then(() => {        
        this.getShoppingCart();
      });
    }
  }

  addItemsNumber(productId: string, index: number) {
    const qtyProduct = this.itemsFormArray.at(index).value['quantity'];
    this.shoppingCartService.updateShoppingCartItems(this.currentUserId, productId, qtyProduct + 1).then(() => {
      this.getShoppingCart();
    });
  }

  deleteItem(productId: string) {
    this.shoppingCartService.deleteCartItem(this.currentUserId, productId).then(() => {
      this.getShoppingCart();
    });
  }

  getTotal(precio: string, cantidad: number) {
    return parseFloat(precio) * cantidad;
  }

  startPurchase() {
    let items: Item[] = [];
    this.cartItems.forEach((item: ItemCart) => {
      items.push({
        title: item.titulo,
        quantity: item.quantity,
        unit_price: parseFloat(item.precio)
      });
    });
    let productTmp = {
      "back_urls": environment.back_urls,
      "items": items,
      "fee": 0
    };
    console.log(productTmp);
    this.paymentService.createPayment(productTmp).then((res: any) => {
      let response = res.data;
      if (response && response.init_point) {
        this.cartItems.forEach((item: ItemCart) => {
          this.purchaseService.setTemporalPurchase(this.currentUserId, { productId: item.id, productImage: item.imagen, publisher: item.idPublisher, quantity: item.quantity, unit_price: parseFloat(item.precio), title: item.titulo });
        });
        //localStorage.setItem('idSell', `${this.productId}`);
        window.location.href = response.init_point;
      } else {
        console.error('Error: init_point not found in response', response);
      }
    }).catch((error: any) => {
      console.error('Error creating payment:', error);
    });
  }

}
