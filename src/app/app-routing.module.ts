import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartillaComponent } from './components/cartilla/cartilla.component';
import { QRReadingComponent } from './components/qr-reading/qr-reading.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { OpenMesaComponent } from './components/open-mesa/open-mesa.component';
import { CanActivateViaAuthGuardService } from './services/can-activate-via-guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "qrreading", component: QRReadingComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full",  canActivate: [CanActivateViaAuthGuardService] },
  { path: "openmesa", component: OpenMesaComponent, pathMatch: "full",  canActivate: [CanActivateViaAuthGuardService] },
  { path: "cartilla", component: CartillaComponent, pathMatch: "full",  canActivate: [CanActivateViaAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
