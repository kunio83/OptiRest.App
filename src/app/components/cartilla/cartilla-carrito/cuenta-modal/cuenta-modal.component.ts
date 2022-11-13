import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-cuenta-modal',
  templateUrl: './cuenta-modal.component.html',
  styleUrls: ['./cuenta-modal.component.css']
})
export class CuentaModalComponent implements OnInit {
  @Input() name: string;
  @Input() totalPriceOrder: number;
  @Input() itemsOredered: any[];
  showMPModal: boolean = false;
  showSpinner: boolean = false;
  endPayment: boolean = false;


	constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private signalrService: SignalrService,
    private router: Router,
    private loginService: LoginService,
    ) {}

    ngOnInit(): void {

  }

  enviarPedido: () => void = () => {
    this.toastr.success('Cuenta efectuada!');
    this.activeModal.close();
  }

  payMercadoPago(): void {
    this.showSpinner = true;
    this.showMPModal = true;



    setTimeout(() => {
      this.showSpinner = false;
      this.endPayment = true;
      this.signalrService.sendNotificationByAppName('La mesa 3 pagó a traves de MercadoPago', 'optirest-admin');
      this.signalrService.sendNotificationByAppName('La mesa 3 pagó a traves de MercadoPago', 'optirest-mozo');

    }, 2000);
  }

  payCash(): void {
    this.signalrService.sendNotificationByAppName('La mesa 3 requiere pagar en Efectivo', 'optirest-admin');
    this.signalrService.sendNotificationByAppName('La mesa 3 requiere pagar en Efectivo', 'optirest-mozo');
    this.toastr.success('Cuenta efectuada!, se dará aviso al mozo.');
    this.activeModal.close();
  }

  closeMPModal(): void {
    this.showMPModal = false;
    this.activeModal.close();

    this.loginService.logOut();
  }
}
