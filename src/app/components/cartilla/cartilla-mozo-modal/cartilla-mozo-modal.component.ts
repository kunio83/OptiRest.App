import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'src/app/models/table';
import { SignalrService } from 'src/app/services/signalr.service';


@Component({
	selector: "cartilla-mozo-modal",
	templateUrl: "./cartilla-mozo-modal.component.html"
})

export class CartillaMozoModal implements OnInit{
	@Input() name: string;

	constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private signalrService: SignalrService
    ) {}

    ngOnInit(): void {

  }

    pedidoMozoForm = this.formBuilder.group({
      'checkbox-mozo': false,
      'checkbox-servilletas': false,
      'checkbox-hielo': false,
      'checkbox-pimienta': false,
      'checkbox-sal': false,
      'checkbox-limon': false,
      'checkbox-condimentos': false,
      'textarea-custom': '',
    });

  enviarPedido: () => void = () => {
    this.toastr.success('Pedido enviado!');
    this.activeModal.close();

    let mesaData: Table = JSON.parse(localStorage.getItem('currentMesa') ?? '');
    // aca tengo que obtener mesaData de localstorage,con el mozoId obtener el clientId de la app y enviarlo por guid

    let message: string = `Pedido Extra para la mesa N° ${mesaData.id} -
    ${this.pedidoMozoForm.value['checkbox-mozo'] ? '* Presencia del mozo \r\n' : ''}
    ${this.pedidoMozoForm.value['checkbox-servilletas'] ? '* Servilletas \r\n' : ''}
    ${this.pedidoMozoForm.value['checkbox-hielo'] ? '* Hielo \r\n' : ''}
    ${this.pedidoMozoForm.value['checkbox-sal'] ? '* Sal \r\n' : ''}
    ${this.pedidoMozoForm.value['checkbox-limon'] ? '* Limon \r\n' : ''}
    ${this.pedidoMozoForm.value['checkbox-condimentos'] ? '* Condimentos \r\n' : ''}
    ${this.pedidoMozoForm.value['textarea-custom'] ? '* Personalizado: ' + this.pedidoMozoForm.value['textarea-custom'] : ''}`;
    this.signalrService.sendNotificationByAppName(message, 'optirest-admin');
    this.signalrService.sendNotificationByAppName(message, 'optirest-mozo');
  }

  onSubmit(): void {

  }
}

