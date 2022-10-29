import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { ItemToOrder } from '../models/item-to-order';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartillaService {
  private behaviorSubject: BehaviorSubject<ItemToOrder[]> = new BehaviorSubject<ItemToOrder[]>([]);
  private currentTabBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }

  get itemsToOrder(): Observable<ItemToOrder[]> {return this.behaviorSubject.asObservable();}

  getAllItems(tenantId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(environment.urlApiBase + 'item?tenantId=' + tenantId);
  }

  addItemsToOrder(item: Item, quantity: number): void {
    const currentItemsToOrder = this.behaviorSubject.value;
    const currentItemIds = currentItemsToOrder.map(i => i.item.id);

    if (currentItemIds.includes(item.id)) {
      const itemToOrder = currentItemsToOrder.find(i => i.item.id === item.id) ?? new ItemToOrder();
      itemToOrder.quantity += quantity;
      this.behaviorSubject.next(currentItemsToOrder);
    } else {
      const newItemToOrder: ItemToOrder = new ItemToOrder();
      newItemToOrder.item = item;
      newItemToOrder.quantity = quantity;
      const updatedValue: ItemToOrder[] = [...currentItemsToOrder, newItemToOrder];

      this.behaviorSubject.next(updatedValue);
    }
  }

  getItemsToOrderValue(): ItemToOrder[] {
    return this.behaviorSubject.getValue();
  }

  removeItemFromOrder(item: ItemToOrder): void {
    const currentItemsToOrder = this.behaviorSubject.value;
    const updatedValue = currentItemsToOrder.filter(i => i.item.id !== item.item.id);

    this.behaviorSubject.next(updatedValue);
  }

  makeOrder(order: Order): Observable<Order> {
    console.log('ordenar');
    return this.httpClient.post<Order>(environment.urlApiBase + 'order', order);
  }

  clearOrder() {
    this.behaviorSubject.next([]);
  }

  get getCurrentTab(): Observable<string> { return this.currentTabBehaviorSubject.asObservable();}
  set setCurrentTab(value: string) {this.currentTabBehaviorSubject.next(value);}
}
