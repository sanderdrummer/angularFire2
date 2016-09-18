import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'productFilterPipe' })
export class ProductFilterPipe implements PipeTransform {
  transform(products: any[], query) {
    if (!query) return products;

    if (products && products.length) {
      const filteredProducts = products.filter(product => {
        if (product && product.name) {
          return product.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        } else {
          return true;
        }
      });
      return filteredProducts;
    } else {
      return [];
    }
  }
}
