
import { Component } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { Router } from '@angular/router';
import { FrontPageComponent } from "../../common/front-page/front-page.component";
import { ToastrService } from "ngx-toastr";
import { DinerUser } from "src/app/models/diner-user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../shared/login.component.css"]
})
export class RegisterComponent {
  user: DinerUser = new  DinerUser();
  passwordRepeated: string;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  register() {
    if (this.user.passwordHash == this.passwordRepeated) {
      this.userService
      .register(this.user)
      .subscribe({
        next: data => {
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
          this.toastr.success('Usuario registrado correctamente', 'Inicie sesión');

        }
        ,error: err => {
        this.toastr.error(err.error, 'Error al registrar el usuario');
        }
      });
    } else {
      this.toastr.error('Las contraseñas deben ser iguales!');
    }
  }
}
