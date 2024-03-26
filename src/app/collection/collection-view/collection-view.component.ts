import { Component, OnInit } from '@angular/core';
import { Brand } from '../constants/brand';
import { ProductType } from '../constants/productType';
import { Product } from 'src/app/home/constants/product';
import { Item } from '../constants/item';
import { COLLECTIONS } from '../constants/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {
  gridSelected: boolean = true;
  listSelected: boolean = false;

  brands: Brand[] = [
    { "idBrand": 1, "brand": "Apple", "brandName": "Apple" },
    { "idBrand": 2, "brand": "Dell", "brandName": "Dell" },
    { "idBrand": 3, "brand": "HP", "brandName": "Hewlett-Packard" },
    { "idBrand": 4, "brand": "Lenovo", "brandName": "Lenovo" },
    { "idBrand": 5, "brand": "ASUS", "brandName": "ASUS" },
    { "idBrand": 6, "brand": "Acer", "brandName": "Acer" },
    { "idBrand": 7, "brand": "MSI", "brandName": "MSI" },
    { "idBrand": 8, "brand": "Samsung", "brandName": "Samsung" },
    { "idBrand": 9, "brand": "Toshiba", "brandName": "Toshiba" },
    { "idBrand": 10, "brand": "Sony", "brandName": "Sony" },
    { "idBrand": 11, "brand": "Microsoft", "brandName": "Microsoft (Surface)" },
    { "idBrand": 12, "brand": "Huawei", "brandName": "Huawei" },
    { "idBrand": 13, "brand": "LG", "brandName": "LG" },
    { "idBrand": 14, "brand": "Google", "brandName": "Google (Chromebook Pixel)" },
    { "idBrand": 15, "brand": "Razer", "brandName": "Razer" }
  ];

  productTypes: ProductType[] = [
    { "idType": 1, "type": "Laptop", "typeName": "Laptop" },
    { "idType": 2, "type": "Desktop", "typeName": "Desktop" },
    { "idType": 3, "type": "Tablet", "typeName": "Tablet" },
    { "idType": 4, "type": "Servidor", "typeName": "Servidor" },
    { "idType": 5, "type": "Impresora", "typeName": "Impresora" },
    { "idType": 6, "type": "Monitor", "typeName": "Monitor" },
    { "idType": 7, "type": "Teclado", "typeName": "Teclado" },
    { "idType": 8, "type": "Ratón", "typeName": "Ratón" },
    { "idType": 9, "type": "Disco Duro", "typeName": "Disco Duro" },
    { "idType": 10, "type": "Memoria RAM", "typeName": "Memoria RAM" },
    { "idType": 11, "type": "Tarjeta Gráfica", "typeName": "Tarjeta Gráfica" }
  ];


  products: Product[] = [
    { "id": 1, "titulo": "Laptop HP Pavilion 15", "precio": 899.99, "imagen": "https://m.media-amazon.com/images/I/81rYhk1oFeL.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 2, "titulo": "Desktop Dell Inspiron 3671", "precio": 699.99, "imagen": "https://m.media-amazon.com/images/I/51FO9OfkdRL.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 3, "titulo": "Tablet Samsung Galaxy Tab S7", "precio": 649.99, "imagen": "https://m.media-amazon.com/images/I/7160FO0Uc3L._AC_UF894,1000_QL80_.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 4, "titulo": "Servidor Lenovo ThinkSystem SR650", "precio": 2199.99, "imagen": "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjMyNjF8aW1hZ2UvcG5nfGg2OC9oZDgvOTQ4OTAwNTI0ODU0Mi5wbmd8NWEzMzQwNzgzYjA0MzA4MTE1NGNjNmQ2YjZmMWNiM2QzOTg1N2Q2NjEyZTQyZTUxOGY4MGM5Yjc5NGQ4OTU2Zg/lenovo-servers-rack-thinksystem-sr650-series.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 5, "titulo": "Impresora Canon PIXMA TR4520", "precio": 99.99, "imagen": "https://m.media-amazon.com/images/I/61GNQrTapdL._AC_UF1000,1000_QL80_.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 6, "titulo": "Monitor ASUS VP249QGR", "precio": 179.99, "imagen": "https://m.media-amazon.com/images/I/91G9etn8L4L._AC_UF894,1000_QL80_.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 7, "titulo": "Teclado Logitech G213 Prodigy", "precio": 49.99, "imagen": "https://ddtech.mx/assets/uploads/5ecd00eaf3296505c0a85e724deb2db9.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 8, "titulo": "Ratón Razer DeathAdder Elite", "precio": 69.99, "imagen": "https://m.media-amazon.com/images/I/51XM+ldQ7JS.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 9, "titulo": "Disco Duro Externo Seagate Backup Plus 2TB", "precio": 79.99, "imagen": "https://m.media-amazon.com/images/I/618jxrTWXIL.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 10, "titulo": "Memoria RAM Corsair Vengeance LPX 16GB", "precio": 79.99, "imagen": "https://m.media-amazon.com/images/I/51Y7ugfDRWS._AC_UF894,1000_QL80_.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." },
    { "id": 11, "titulo": "Tarjeta Gráfica NVIDIA GeForce RTX 3080", "precio": 799.99, "imagen": "https://m.media-amazon.com/images/I/71UStULnUyS.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis." }
  ];

  collections: Item[] = COLLECTIONS;
  collectionName: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(((res: any) => {
      console.log(res);
    }));
    this.activatedRoute.params.subscribe(((res: any) => {
      let collectionId = res['collection-id'];
      let collectionObject = this.collections.find(collection => collection.id = collectionId);
      this.collectionName = collectionObject?.name;
    }));
  }

  selectGrid() {
    this.gridSelected = true;
    this.listSelected = false;
  }

  selectList() {
    this.listSelected = true;
    this.gridSelected = false;
  }
}
