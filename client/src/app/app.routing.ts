import { LoggedGuardService } from './services/guards/logged-guard.service';
import { ProfileResolverService } from './services/profile-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartModule } from './modules/cart/cart.module';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', },

    // Authentication
    { path: 'auth', loadChildren: './modules/authentication/authentication.module#AuthenticationModule' },

    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, resolve: {
        'user': ProfileResolverService
    } },

    // Products
    { path: 'products', loadChildren: './modules/products/products.module#ProductsModule' },
    { path: 'add-edit-product', component: AddEditProductComponent, canActivate: [LoggedGuardService] },

    // Orders
    { path: 'orders', loadChildren: './modules/orders/orders.module#OrdersModule' },

    // Cart
    { path: 'cart', loadChildren: './modules/cart/cart.module#CartModule' },

    { path: 'about', component: AboutComponent },

    { path: '*', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        { preloadingStrategy: PreloadAllModules }
    )],
    exports: [RouterModule]
})
export class AppRouting { }
