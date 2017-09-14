import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchfilter' })

@Injectable()
export class SearchFilterPipe implements PipeTransform {

  transform(product: any[], searchTerm: string): any[] {
    searchTerm = searchTerm.toUpperCase();
    if (searchTerm === '') {
      return product;
    }

    return product.filter(item => {
      return item.name.toUpperCase().indexOf(searchTerm) !== -1;
    });
  }
}
