import { PromotionsService } from '../../services/promotions.service';
import { Component, OnInit, NgModule, ViewContainerRef } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@NgModule({
  imports: [CarouselModule]
})

export class HomeComponent implements OnInit {
  promotions;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private promotionsService: PromotionsService,
    public toastr: ToastsManager, vcRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcRef);
  }

  ngOnInit() {
    this.promotions = this.promotionsService.getAll();
  }
}
