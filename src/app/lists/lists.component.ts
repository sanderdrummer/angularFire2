import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: FirebaseListObservable<any>;
  selectedList:any;

  newName:string;

  constructor(af: AngularFire) {
    this.lists = af.database.list('/lists');
  }

  ngOnInit() {
  }

  addList(name) {
    this.lists.push({
      name: name,
      products: []
    });
    this.newName = '';
  }

  removeList(list) {
    if (list && list.$key) {
      this.lists.remove(list.$key);
    }
  }

  selectList(list) {
    this.selectedList = list;
  }
}
