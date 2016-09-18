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
    this.products = this.af.database.list('/productList');
  }

  ngOnChanges(changes) {
    console.log(changes);
    this.parentProducts = this.af.database.list('/lists/' + this.parentList + '/products');
  }

  ngOnInit() {
  }

  addNewProduct(name) {
    if (name) {
      this.products.push({
        name: name
      });
      this.query = '';
    }
  }

  removeProduct(key) {
    this.products.remove(key);
  }

  addProduct(product, index) {


    var newProduct = {
      name: product.name || this.query,
      amount: product.amount || 1,
      inBasket:false,
    };

    console.log(newProduct);



    this.parentProducts.push(newProduct);
    this.query = '';
  }
}
