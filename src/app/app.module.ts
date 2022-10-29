import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { FrontPageComponent } from './components/common/front-page/front-page.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './materia.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MesaService } from './services/mesa.service';
import { OpenMesaComponent } from './components/open-mesa/open-mesa.component';
import { CartillaComponent } from './components/cartilla/cartilla.component';
import { CartillaCarritoComponent } from './components/cartilla/cartilla-carrito/cartilla-carrito.component';
import { CartillaMenuComponent } from './components/cartilla/cartilla-menu/cartilla-menu.component';
import { ItemComponent } from './components/cartilla/cartilla-menu/item/item.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { CartillaService } from './services/cartilla.service';
import { HeaderoptiComponent } from './components/common/headeropti/headeropti.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FrontPageComponent,
    OpenMesaComponent,
    CartillaComponent,
    CartillaCarritoComponent,
    CartillaMenuComponent,
    ItemComponent,
    HeaderoptiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ZXingScannerModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [CookieService, MesaService, CartillaService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
