import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { Table } from 'src/app/models/table';
import { CartillaService } from 'src/app/services/cartilla.service';
import { CartillaMozoModal } from './cartilla-mozo-modal/cartilla-mozo-modal.component';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {
  image: string;
  selectedTab: string = '';
  showModal: boolean = false;
  itemsToOrder: Item[];


  constructor(
    private modalService: NgbModal,
    private cartillaService: CartillaService
  ) {
    }

  ngOnInit(): void {
    let mesaData: Table = JSON.parse(localStorage.getItem('currentMesa') ?? '');

    this.image = mesaData.tenant.businessConfig.logo;


    this.cartillaService.getCurrentTab.subscribe(tab => {
      this.selectedTab = tab;
    });
    this.cartillaService.setCurrentTab = 'carta';
  }

  openLista(): void{
    this.selectedTab = 'lista';
    this.cartillaService.setCurrentTab = 'lista';
  }

  openCarta(): void{
    this.cartillaService.setCurrentTab = 'carta';
    //this.selectedTab = 'carta';
  }

  showMozoModal(): void{
    console.log('openMozoModal');
    const modalRef = this.modalService.open(CartillaMozoModal);
		modalRef.componentInstance.name = 'World';
  }
}
