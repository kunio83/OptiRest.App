import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { ItemToOrder } from '../models/item-to-order';

@Injectable({
  providedIn: 'root'
})
export class CartillaService {
  private behaviorSubject: BehaviorSubject<ItemToOrder[]> = new BehaviorSubject<ItemToOrder[]>([]);

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
}
