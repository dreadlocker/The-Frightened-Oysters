import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';

import { firebaseConfig } from './../environments/firebase.config';

// External Modules
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal Modules
import { SharedModule } from './modules/shared/shared.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ProductsModule } from './modules/products/products.module';
import { ModalModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AboutComponent } from './components/about/about.component';
import { CoreModule } from './modules/core-module/core.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DetailsComponent } from './components/products/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CarouselModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    CoreModule.forRoot(),
    ModalModule.forRoot(),

    AuthenticationModule,
    ProductsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AddEditProductComponent,
    AboutComponent,
    NotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
