
import { Component } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { Router } from '@angular/router';
import { FrontPageComponent } from "../../common/front-page/front-page.component";
import { User } from "src/app/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../shared/login.component.css"]
})
export class RegisterComponent {
  user: User = new  User();
  passwordRepeated: string;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  register() {
    if (this.user.passwordHash == this.passwordRepeated) {
      this.userService.register(this.user).subscribe({
        next: data => {
          this.router.navigateByUrl('/login');
        }
      });
    } else {
      this.toastr.error('Las contraseñas deben ser iguales!');
    }
  }
}
