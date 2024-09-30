import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from 'src/app/home/constants/discount';
import { Review } from 'src/app/product/constants/review';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  discounts: Discount[] = [
    {
      imagePath: 'assets/banners/mac.webp',
      className: 'about-us-card-gray',
      title: "Contactanos",
      content: '¡Haznos saber cómo podemos ayudarte!"',
      redirectPath: "contact-us"
    },
    {
      imagePath: 'assets/banners/monitor.webp',
      className: 'about-us-card-blue',
      title: 'Ofertas',
      content: '¡No te pierdas nuestras increíbles promociones!',
      redirectPath: "collection"
    },
    {
      imagePath: 'assets/banners/tablet.webp',
      className: 'about-us-card-gray',
      title: 'Envios',
      content: 'Haz tu pedido hoy y recíbelo pronto.',
      redirectPath: "delivery-info"
    }
  ];
  reviews: Review[] = [
    {
      "id": "1",
      "author": "Cliente 1",
      "rating": 5,
      "content": "Gran experiencia de compra, el proceso fue rápido y sencillo. Los productos llegaron en perfectas condiciones."
    },
    {
      "id": "2",
      "author": "Cliente 2",
      "rating": 4,
      "content": "Buen servicio al cliente, aunque el tiempo de entrega podría ser un poco más rápido."
    },
    {
      "id": "3",
      "author": "Cliente 3",
      "rating": 3,
      "content": "La experiencia fue aceptable, sin embargo, hubo algunos problemas con el seguimiento del pedido."
    },
    {
      "id": "4",
      "author": "Cliente 4",
      "rating": 2,
      "content": "No quedé completamente satisfecho con la experiencia de compra, hubo demoras en la entrega y falta de comunicación."
    },
    {
      "id": "5",
      "author": "Cliente 5",
      "rating": 1,
      "content": "Muy decepcionado con la calidad del servicio. El producto llegó dañado y el servicio de atención al cliente fue deficiente."
    }
  ];
  currentReview!: Review;

  constructor(private router: Router){}

  ngOnInit() {
    this.currentReview = this.reviews[0];
  }

  previousReview() {
    const currentIndex = this.reviews.findIndex(review => review.id === this.currentReview.id);
    if (currentIndex > 0) {
      this.currentReview = this.reviews[currentIndex - 1];
    } else {
      this.currentReview = this.reviews[0];
    }
  }

  nextReview() {
    const currentIndex = this.reviews.findIndex(review => review.id === this.currentReview.id);
    if (currentIndex < this.reviews.length - 1) {
      this.currentReview = this.reviews[currentIndex + 1];
    } else {
      this.currentReview = this.reviews[0];
    }
  }

  getStarArray(rating: number | undefined): number[] {
    if (rating != undefined) {
      return Array.from({ length: rating });
    } else {
      return [];
    }
  }

  goTo(path: string | undefined){
    this.router.navigate([`${path}`]);
  }

}
