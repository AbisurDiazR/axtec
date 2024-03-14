import { Component } from '@angular/core';
import { Brand } from '../constants/brand';
import { ProductType } from '../constants/productType';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent {
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
    { "idBrand": 10, "brand": "Sony", "brandName": "Sony (anteriormente conocido como Sony VAIO)" },
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

}
