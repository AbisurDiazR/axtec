import { Component } from '@angular/core';
import { Article } from '../constants/article';
import { RedirectService } from 'src/app/services/redirect.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  articles: Article[] = [
    {
      "id": "1",
      "titulo": "Título del artículo 1",
      "fecha": "2024-03-30",
      "extracto": "Extracto del artículo 1",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "2",
      "titulo": "Título del artículo 2",
      "fecha": "2024-03-31",
      "extracto": "Extracto del artículo 2",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "3",
      "titulo": "Título del artículo 3",
      "fecha": "2024-04-01",
      "extracto": "Extracto del artículo 3",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "4",
      "titulo": "Título del artículo 4",
      "fecha": "2024-04-02",
      "extracto": "Extracto del artículo 4",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "5",
      "titulo": "Título del artículo 5",
      "fecha": "2024-04-03",
      "extracto": "Extracto del artículo 5",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "6",
      "titulo": "Título del artículo 6",
      "fecha": "2024-04-04",
      "extracto": "Extracto del artículo 6",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "7",
      "titulo": "Título del artículo 7",
      "fecha": "2024-04-05",
      "extracto": "Extracto del artículo 7",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "8",
      "titulo": "Título del artículo 8",
      "fecha": "2024-04-06",
      "extracto": "Extracto del artículo 8",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "9",
      "titulo": "Título del artículo 9",
      "fecha": "2024-04-07",
      "extracto": "Extracto del artículo 9",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "10",
      "titulo": "Título del artículo 10",
      "fecha": "2024-04-08",
      "extracto": "Extracto del artículo 10",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "11",
      "titulo": "Título del artículo 10",
      "fecha": "2024-04-08",
      "extracto": "Extracto del artículo 10",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      "id": "12",
      "titulo": "Título del artículo 10",
      "fecha": "2024-04-08",
      "extracto": "Extracto del artículo 10",
      "imagen": "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    }
  ];

  constructor(private navigateService: RedirectService){}

  goToBlog(path: string | undefined){
    if(path != undefined){
      this.navigateService.redirectTo(`blog/${path}`);
    }
  }
}
