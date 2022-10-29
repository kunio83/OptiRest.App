import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { DinerUser } from "../models/diner-user";

@Injectable({
  providedIn: "root"
})
export class UsersService {
    constructor(private http: HttpClient, private cookies: CookieService) {}

  getUserByEmail(userEmail: string): Observable<DinerUser> {
    return this.http.get<DinerUser>(environment.urlApiBase + 'dinerUser/byEmail/' + userEmail);
  }

  register(user: DinerUser): Observable<any> {
    return this.http.post(environment.urlApiBase + 'dineruser/', user);
  }
}
