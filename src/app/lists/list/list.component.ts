import { Component, OnInit, Input } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() listKey = null;
  @Input() listName = '';
  products: FirebaseListObservable<any>;
  product:{}
  showAddProducts: boolean;

  constructor(private af: AngularFire) {
    this.product = {
      name: '',
      amount: ''
    }

    this.showAddProducts = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.listKey) {
      this.products = this.af.database.list('/lists/' + this.listKey + '/products', {query: {
        orderByChild: 'inBasket',
        }
      });
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

  toggleAddProducts(value) {
    this.showAddProducts = value;
  }

  resetList() {
    this.products.remove();
  }
}
