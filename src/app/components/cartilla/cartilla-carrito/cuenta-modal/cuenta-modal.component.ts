import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

	constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private signalrService: SignalrService,
    ) {}

    ngOnInit(): void {

  }

  enviarPedido: () => void = () => {
    this.toastr.success('Cuenta efectuada!');
    this.activeModal.close();
  }

  payMercadoPAgo(): void {
    this.toastr.success('Pagado por MercadoPago');
    this.activeModal.close();
  }

  payCash(): void {
    this.signalrService.sendNotificationByAppName('La mesa 3 requiere pagar en Efectivo', 'optirest-admin');
    this.signalrService.sendNotificationByAppName('La mesa 3 requiere pagar en Efectivo', 'optirest-mozo');
    this.toastr.success('Cuenta efectuada!');
    this.activeModal.close();
  }
}
