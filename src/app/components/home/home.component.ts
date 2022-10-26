import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { BarcodeFormat } from '@zxing/library';
import { MesaService } from "src/app/services/mesa.service";
import { MesaRequest } from "src/app/models/mesa-request";
import { Router } from "@angular/router";
import { Table } from "src/app/models/table";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(
    private userService: UsersService,
    public router: Router,
    private mesaService: MesaService
    ) {}

  ngOnInit() {
    this.getUserLogged();
  }

  getUserLogged() {
    this.userService.getUser().subscribe(user => {
      console.log(user);
    });
  }

  onScanSuccess(event: any): void {
    //enviar request de mesa
    let mesaRequest: MesaRequest = new MesaRequest();
    // mesaRequest.mesaId = event;
    mesaRequest.mesaId = 3;
    mesaRequest.otrodato = "algun otro dato";

    this.mesaService.getMesaData(mesaRequest)
    .subscribe({
      next: data => {
          localStorage.setItem('currentMesa', JSON.stringify(data));
          this.router.navigateByUrl('/openmesa');
      }
    });
  }

  //solo con propositos de testeo
  skipScan(): void{
    // borrar esto, solo para testeo
    this.onScanSuccess(16);
  }
}
