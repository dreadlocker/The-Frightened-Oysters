import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { IOrder } from '../../../../models/IOrder';

@Component({
  selector: 'app-list-order-element',
  templateUrl: './list-order-element.component.html',
  styleUrls: ['./list-order-element.component.css']
})
export class ListOrderElementComponent implements OnInit, AfterContentInit {
  @Input()
  order: IOrder;

  @Input()
  showUrls: boolean;

  constructor() { }

  ngAfterContentInit(): void {
    if (typeof this.showUrls === 'undefined') {
      this.showUrls = true;
    }
  }

  ngOnInit() {
  }

}
