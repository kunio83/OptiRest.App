import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

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
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
