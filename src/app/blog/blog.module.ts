import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { BlogArticleComponent } from './blog-article/blog-article.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
