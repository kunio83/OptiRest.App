import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableService } from '../models/table-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private behaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isUserLogged(): Observable<boolean> {return this.behaviorSubject.asObservable();}

  constructor(
    private router: Router,
  ) { }

  setUserLogged(isLogged: boolean): void {
    this.behaviorSubject.next(isLogged);
  }

  logOut() : void {
    this.behaviorSubject.next(false);
    localStorage.removeItem('currentUser');

    if (localStorage.getItem('currentTableService')) {
      let currentTableService: TableService = JSON.parse(localStorage.getItem('currentTableService') ?? '');

      if (currentTableService.items && currentTableService.items.length == 0) {
        localStorage.removeItem('currentTableService');
        localStorage.removeItem('currentMesa');
      }
  }

    this.router.navigateByUrl('/');
  }
}
