import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { BarcodeFormat } from '@zxing/library';
import { MesaService } from "src/app/services/mesa.service";
import { MesaRequest } from "src/app/models/mesa-request";
import { Router } from "@angular/router";
import { Table } from "src/app/models/table";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./qr-reading.component.html",
  styleUrls: ["./qr-reading.component.css"]
})
export class QRReadingComponent implements OnInit {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(
    private userService: UsersService,
    public router: Router,
    private mesaService: MesaService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
  }


  onScanSuccess(event: any): void {
    //enviar request de mesa
    let mesaRequest: MesaRequest = new MesaRequest();
    mesaRequest.mesaId = event;
    //mesaRequest.mesaId = 3; //<-- solo para testeo
    mesaRequest.otrodato = "";

    this.mesaService.getMesaData(mesaRequest)
    .subscribe({
      next: data => {
          if (data == undefined || data == null) {
            throw new Error("No se encontró la mesa");
          }

          let isMesaValid = this.isMesaValid(data);

          if (isMesaValid) {
            localStorage.setItem('currentMesa', JSON.stringify(data));
            this.router.navigateByUrl('/openmesa');
          }
      },
      error: err => {
        this.toastr.error(err.error, 'Error al obtener los datos de la mesa');
      }
    });
  }

  isMesaValid(mesa: Table): boolean {
    if (mesa.stateId == 2) {
      this.toastr.error("La mesa ya está ocupada");
      return false;
    }
    else if (mesa.stateId == 3) {
      this.toastr.error("La mesa está en mantenimiento");
      return false;
    }

    return true;
  }

  //solo con propositos de testeo
  skipScan(): void{
    // borrar esto, solo para testeo
    this.onScanSuccess(30);
  }
}
