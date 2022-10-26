import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CartillaService {
  private behaviorSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor(private httpClient: HttpClient) { }

  get itemsToOrder(): Observable<Item[]> {return this.behaviorSubject.asObservable();}

  getAllItems(tenantId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(environment.urlApiBase + 'item?tenantId=' + tenantId);
  }

  addItemsToOrder(item: Item, quantity: number): void {
    for (let index = 0; index < quantity; index++) {
      const currentValue = this.behaviorSubject.value;
      const updatedValue = [...currentValue, item];

      this.behaviorSubject.next(updatedValue);
    }
  }

  getItemsToOrderValue(): Item[] {
    return this.behaviorSubject.getValue();
  }
}
