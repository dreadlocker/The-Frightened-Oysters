import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../../../services//products.service';
import { PromotionsService } from '../../../services//promotions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public details; public promoDetails;
  constructor(
    @Inject(ProductsService) private productsService,
    private activatedRoute: ActivatedRoute,
    @Inject(PromotionsService) private promotionsService) {
  }

  ngOnInit() {
    const id = (this.activatedRoute.snapshot.params['id']);
    if (isNaN(id)) {
      // const promoid = (this.activatedRoute.snapshot.params['id']);
      this.promoDetails = this.promotionsService.getById(id);
    } else {
      const detailsId = (+this.activatedRoute.snapshot.params['id']);
      this.details = this.productsService.getById(detailsId)
        .subscribe(details => {
          this.details = details;
        });
    }

  }

}
