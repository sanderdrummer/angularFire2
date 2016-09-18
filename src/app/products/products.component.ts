import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  query:string;
  product:any;
  products: FirebaseListObservable<any>;
  parentProducts: FirebaseListObservable<any>;
  resolvedProducts:any[];
  filteredProducts:any[];

  @Input() parentList = '';

  constructor(private af: AngularFire) {
    this.product = {
      name: '',
      amount: ''
    };
  }

  ngOnChanges(changes) {
    console.log(changes);
    this.products = this.af.database.list('/productList');
    this.parentProducts = this.af.database.list('/lists/' + this.parentList + '/products');
    this.parentProducts.subscribe((item) => {
      this.resolvedProducts = item;
      this.filteredProducts = this.resolvedProducts;
      console.log(this.filteredProducts, this.resolvedProducts  )

    });
  }

  ngOnInit() {
  }

  searchFor(query) {
    console.log(query, this.filteredProducts, this.resolvedProducts  )
    if (query) {
      this.filteredProducts = this.resolvedProducts.filter((product) => {
        return product.name.indexOf(query) > -1;
      })
    } else {
      this.filteredProducts = this.resolvedProducts
    }
  }

  addNewProduct(name) {
    this.products.push({name});
    this.query = '';
  }

  removeProduct(key) {
    this.products.remove(key);
  }

  addProduct(product) {
    var newProduct = {
      name: product.name || this.query,
      amount: product.amount || 1,
      inBasket:false,
    };
    console.log(newProduct, this.query,  this.parentProducts,  )

    if (!this.filteredProducts.length) {
      this.addNewProduct(this.query);
    }
    this.parentProducts.push(newProduct);
    this.query = '';
  }
}
