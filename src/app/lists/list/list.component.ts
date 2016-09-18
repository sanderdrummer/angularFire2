import { Component, OnInit, Input } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() listKey = null;
  products: FirebaseListObservable<any>;
  product:{}

  constructor(private af: AngularFire) {
    this.product = {
      name: '',
      amount: ''
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log(changes, this.listKey);
    if (this.listKey) {
      this.products = this.af.database.list('/lists/' + this.listKey + '/products', {query: {
        orderByChild: 'inBasket',
        }
      });
    }

    console.log(this.products);
  }

  addProduct(product) {

    product.inBasket = false;
    this.products.push(product);
    this.product = {
      name: '',
      amount: ''
    }
  }

  addToBasket(product) {
    product.inBasket = !product.inBasket;
    this.products.update(product.$key, {
      name: product.name,
      amount: product.amount,
      inBasket: product.inBasket
    });
  }
}
