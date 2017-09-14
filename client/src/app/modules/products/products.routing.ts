import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from '../../services/products-resolver.service';

import { ProductsComponent } from '../../components/products/list/products.component';
import { DetailsComponent } from '../../components/products/details/details.component';
import { EditProductComponent } from '../../components/products/edit/edit.component';

const appRoutes: Routes = [
    { path: '', component: ProductsComponent, resolve: {
        'products': ProductsResolverService
    } },
    { path: ':id', component: DetailsComponent},
    { path: 'edit/:id', component: EditProductComponent}
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class ProductsRouting { }
