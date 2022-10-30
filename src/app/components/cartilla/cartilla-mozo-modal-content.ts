import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ngbd-modal-content',
	template: `
		<div class="modal-header" style="border-bottom: 1px solid #D92200;">
			<p class="modal-title" style="    font-size: 18px; font-weight: bold; color: #D92200;">Pedido al mozo</p>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"
      style="padding: 0; margin:0"></button>
		</div>

		<div class="modal-body">
      <form action="obSubmit()">

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-mozo" id="checkbox-mozo" class="form-check-input">
          <label for="checkbox-mozo" class="form-check-label">Solicitar presencia del Mozo</label>
        </div>

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-servilletas" id="checkbox-servilletas" class="form-check-input">
          <label for="checkbox-servilletas" class="form-check-label">Servilletas</label>
        </div>

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-hielo" id="checkbox-hielo" class="form-check-input">
          <label for="checkbox-hielo" class="form-check-label">Hielo</label>
        </div>

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-sal" id="checkbox-sal" class="form-check-input">
          <label for="checkbox-sal" class="form-check-label">Sal</label>
        </div>

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-pimienta" id="checkbox-pimienta" class="form-check-input">
          <label for="checkbox-pimienta" class="form-check-label">Pimienta</label>
        </div>

        <div class="form-check mb-2">
          <input type="checkbox" name="checkbox-limon" id="checkbox-limon" class="form-check-input">
          <label for="checkbox-limon" class="form-check-limon">Limon</label>
        </div>

        <div class="form-check mb-3">
          <input type="checkbox" name="checkbox-condimentos" id="checkbox-condimentos" class="form-check-input">
          <label for="checkbox-condimentos" class="form-check-label">Condimentos</label>
        </div>

        <div class="mb-3">
          <label for="custom">Otro (escriba su pedido):</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

          <button type="submit" class="btn btn-danger btn-sm float-end mb-3" (click)="enviarPedido()">Enviar Pedido</button>

      </form>


    <!--
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>-->
	`,
})
export class NgbdModalContent {
	@Input() name: string;

	constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
    ) {}

  enviarPedido: () => void = () => {
    this.toastr.success('Pedido enviado!');
    this.activeModal.close();
  }
}
