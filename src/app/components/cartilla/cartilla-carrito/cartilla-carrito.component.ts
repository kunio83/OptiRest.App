import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item';
import { ItemToOrder } from 'src/app/models/item-to-order';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { TableService } from 'src/app/models/table-service';
import { CartillaService } from 'src/app/services/cartilla.service';

@Component({
  selector: 'app-cartilla-carrito',
  templateUrl: './cartilla-carrito.component.html',
  styleUrls: ['./cartilla-carrito.component.css']
})
export class CartillaCarritoComponent implements OnInit {
  itemsToOrder: ItemToOrder[] = [];
  totalPrice: number;

  constructor(
    private cartillaService: CartillaService,
    private toastr: ToastrService
    ) { }

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
    let currentTableService: TableService = JSON.parse(localStorage.getItem('currentTableService') ?? '');
    let order: Order = new Order();
    let orderDetails: OrderDetail[] = [];

    this.itemsToOrder.forEach(item => {
      let orderDetail: OrderDetail = new OrderDetail();
      orderDetail.itemId = item.item.id;
      orderDetail.quantity = item.quantity;
      orderDetails.push(orderDetail);
    });

    order.tableServiceId = currentTableService.id;
    order.orderDetails = orderDetails;

    this.cartillaService.makeOrder(order).subscribe(response => {
      if (response) {
        this.cartillaService.clearOrder();
        this.toastr.success('Pedido realizado con éxito');
      }
    }, error => {
      this.toastr.error(error.error, 'Error al realizar el pedido');
    }
    );
  }
}
