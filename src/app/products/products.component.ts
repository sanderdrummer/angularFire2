import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.products = af.database.list('/products');
  }

  ngOnInit() {
  }

}
