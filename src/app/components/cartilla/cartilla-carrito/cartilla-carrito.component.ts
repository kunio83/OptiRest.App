import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemToOrder } from 'src/app/models/item-to-order';
import { CartillaService } from 'src/app/services/cartilla.service';

@Component({
  selector: 'app-cartilla-carrito',
  templateUrl: './cartilla-carrito.component.html',
  styleUrls: ['./cartilla-carrito.component.css']
})
export class CartillaCarritoComponent implements OnInit {
  itemsToOrder: ItemToOrder[] = [];
  totalPrice: number;

  constructor(private cartillaService: CartillaService) { }

  ngOnInit(): void {
    this.cartillaService.itemsToOrder.subscribe(items => {
      this.itemsToOrder = items;
      this.totalPrice = this.itemsToOrder.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
    });
  }

  removeItemFromOrder(item: ItemToOrder): void {
    this.cartillaService.removeItemFromOrder(item);
  }

  order(): void {
    console.log('ordenar');
  }
}
