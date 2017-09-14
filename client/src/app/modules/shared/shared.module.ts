import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListProductElementComponent } from '../../components/products/list-product-element/list-product-element.component';

import { PhonePipe } from '../../pipes/phone-pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavBarComponent,
    FooterComponent,
    ListProductElementComponent,
    PhonePipe
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    ListProductElementComponent,
    CommonModule,
    RouterModule,
    PhonePipe
  ]
})
export class SharedModule { }
