import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './lists/list/list.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDKjWfRUP08276cQslfxYP6K7wyq2WxXUA",
  authDomain: "shoppinglist-fab45.firebaseapp.com",
  databaseURL: "https://shoppinglist-fab45.firebaseio.com",
  storageBucket: "",
};

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListComponent,
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
