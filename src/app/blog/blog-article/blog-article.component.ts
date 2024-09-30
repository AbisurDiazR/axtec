import { Component } from '@angular/core';
import { BlogCategorie } from '../constants/blog-categorie';
import { Article } from '../constants/article';
import { RedirectService } from 'src/app/services/redirect.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent {
  blogCategories: BlogCategorie[] = [
    {
      "id": "1",
      "name": "Últimas Noticias",
      "slug": "ultimas-noticias"
    },
    {
      "id": "2",
      "name": "Análisis de Productos",
      "slug": "analisis-de-productos"
    },
    {
      "id": "3",
      "name": "Guías y Tutoriales",
      "slug": "guias-y-tutoriales"
    },
    {
      "id": "4",
      "name": "Novedades Tecnológicas",
      "slug": "novedades-tecnologicas"
    }
  ];
  recentArticles: Article[] = [
    {
      "id": "1",
      "titulo": "Cómo elegir el mejor smartphone para tus necesidades",
      "fecha": "2024-03-30",
      "extracto": "Descubre algunos consejos útiles para seleccionar el smartphone perfecto que se adapte a tus necesidades y presupuesto.",
      "imagen": "ruta/imagen1.jpg",
      "autor": {
        "nombre": "Juan Pérez",
        "correo": "juan.perez@example.com",
        "foto": "ruta/foto-juan.jpg"
      }
    },
    {
      "id": "2",
      "titulo": "Los avances más recientes en inteligencia artificial",
      "fecha": "2024-04-05",
      "extracto": "Explora las últimas innovaciones en inteligencia artificial y cómo están transformando diversos sectores.",
      "imagen": "ruta/imagen2.jpg",
      "autor": {
        "nombre": "María García",
        "correo": "maria.garcia@example.com",
        "foto": "ruta/foto-maria.jpg"
      }
    },
    {
      "id": "3",
      "titulo": "Los mejores consejos para mejorar la seguridad de tus datos",
      "fecha": "2024-04-10",
      "extracto": "Aprende algunas prácticas recomendadas para proteger tus datos personales y mantener la privacidad en línea.",
      "imagen": "ruta/imagen3.jpg",
      "autor": {
        "nombre": "Carlos Martínez",
        "correo": "carlos.martinez@example.com",
        "foto": "ruta/foto-carlos.jpg"
      }
    }
  ];
  blogArticle: Article = {
    "titulo": "Los últimos avances en inteligencia artificial",
    "fecha": "2024-03-31",
    "extracto": "Descubre los avances más recientes en el campo de la inteligencia artificial y cómo están impactando en diversas industrias.",
    "contenido": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, sapien vel fermentum ultrices, ante nulla varius justo, a convallis magna orci a risus. Phasellus vitae turpis quis magna sollicitudin fermentum sit amet in felis. Integer nec nulla vel quam fermentum accumsan. Vestibulum id urna eget justo aliquet ultricies. Mauris tincidunt, est sed dictum condimentum, elit libero vulputate nisl, a sollicitudin elit tellus eu odio. Cras a ligula at eros vulputate vulputate. In hac habitasse platea dictumst. Donec volutpat nisl et leo scelerisque sagittis. Vestibulum in justo bibendum, rutrum nulla ut, faucibus dui.",
    "imagen": "https://elcorreoweb.es/binrepository/711x400/18c0/675d400/none/10703/SMWC/eca-inteligencia-artificial-ia_21240565_20231020121728.jpg",
    "autor": {
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    },
    "tags": [
      { id: "1", name: "Tecnología" },
      { id: "2", name: "Inteligencia artificial" },
      { id: "3", name: "Innovación" }
    ],
    "comentarios": [
      {
        "usuario": "María García",
        "fecha": "2024-04-01",
        "contenido": "Excelente artículo, muy informativo. ¡Gracias por compartir!"
      },
      {
        "usuario": "Carlos Martínez",
        "fecha": "2024-04-02",
        "contenido": "Interesante lectura. Estoy emocionado por ver hacia dónde se dirige la IA en el futuro."
      }
    ]
  };

  constructor(private naviteService: RedirectService){}

  goToBlog(path: string | undefined){
    if (path != undefined) {
      this.naviteService.redirectTo(`blog/${path}`);
    }
  }

}
