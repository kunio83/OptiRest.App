import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ngbd-modal-content',
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Pedido al mozo</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>

		<div class="modal-body">
      <form action="obSubmit()">
        <div class="form-group">
        <div class="form-check">
          <input type="checkbox" name="checkbox-cervilletas" id="checkbox-cervilletas" class="form-check-input">
          <label for="checkbox-cervilletas" class="form-check-label">Cervilletas</label>
        </div>
        <div class="form-check">
          <input type="checkbox" name="checkbox-hielo" id="checkbox-hielo" class="form-check-input">
          <label for="checkbox-hielo" class="form-check-label">Hielo</label>
        </div>

        <div class="form-check">
          <input type="checkbox" name="checkbox-sal" id="checkbox-sal" class="form-check-input">
          <label for="checkbox-sal" class="form-check-label">Sal</label>
        </div>

        <div class="form-check">
          <input type="checkbox" name="checkbox-limon" id="checkbox-limon" class="form-check-input">
          <label for="checkbox-limon" class="form-check-limon">Limon</label>
        </div>

        <div class="form-check">
          <input type="checkbox" name="checkbox-condimentos" id="checkbox-condimentos" class="form-check-input">
          <label for="checkbox-condimentos" class="form-check-label">Condimentos</label>
        </div>

        <label for="custom">Escriba su pedido</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

        </div>
        <button type="submit" class="btn btn-primary" (click)="enviarPedido()">Enviar Pedido</button>
      </form>

		</div>

		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
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
