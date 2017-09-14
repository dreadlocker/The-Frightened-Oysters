import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailsComponent } from '../../components/products/details/details.component';
import { ProductsRouting } from './products.routing';
import { ProductsComponent } from '../../components/products/list/products.component';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { EditProductComponent } from '../../components/products/edit/edit.component';
import { ProductsService } from '../../services/products.service';


@NgModule({
  imports: [
    CommonModule,
    ProductsRouting,
    HttpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductsComponent,
    DetailsComponent,
    SearchFilterPipe,
    EditProductComponent,
  ]
})

export class ProductsModule { }
