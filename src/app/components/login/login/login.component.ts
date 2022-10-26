import { Component } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { Router } from '@angular/router';
import { User } from "src/app/models/user";
import { FrontPageComponent } from "../../common/front-page/front-page.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../shared/login.component.css"]
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  showSpinner: boolean = false;
  constructor(
    public userService: UsersService,
    public router: Router,
    private toastr: ToastrService
    ) {}

  login() {
    const userInput = { email: this.email, password: this.password };
    this.showSpinner = true;

    this.userService
      .getUserByEmail(userInput.email)
      .subscribe({
        next: user => {

          if (user.passwordHash == userInput.password)
          {
            //this.userService.setToken(data.token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigateByUrl('/');
          }
          else
          {
            this.toastr.error('Contraseña incorrecta');
          }

          this.showSpinner = false;
        },
        error: err => {
          this.toastr.info('Datos ingresados incorrectos!');
          this.router.navigateByUrl('/login');
          this.showSpinner = false;
        },complete: ()=>{
          this.showSpinner = false;
        }
      });
  }
}
