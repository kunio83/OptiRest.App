import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { Table } from 'src/app/models/table';
import { NgbdModalContent } from './cartilla-mozo-modal-content';

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
    private modalService: NgbModal
  ) {
    }

  ngOnInit(): void {
    let mesaData: Table = JSON.parse(localStorage.getItem('currentMesa') ?? '');

    this.image = mesaData.tenant.businessConfig.logo;

    this.selectedTab = 'carta';
  }

  openLista(): void{
    this.selectedTab = 'lista';
    console.log('openLista');
  }

  openCarta(): void{
    this.selectedTab = 'carta';
    console.log('openCarta');
  }

  showMozoModal(): void{
    console.log('openMozoModal');
    const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = 'World';
  }
}
