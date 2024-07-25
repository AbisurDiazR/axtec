import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure-page',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.scss']
})
export class FailurePageComponent implements OnInit {
  productId: any;

  constructor(
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.productId = localStorage.getItem('idSell');
  }

  tryAgain(){
    if (this.productId != undefined) {
      this.router.navigate([`product/${this.productId}`]);
    }else{
      this.router.navigate(['home']);
    }
  }

}
