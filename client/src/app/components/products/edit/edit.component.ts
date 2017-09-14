import { IError } from '../../../models/IError';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../../models/IProduct';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditProductComponent implements OnInit {
  product: IProduct;

  public name: FormControl;
  public size: FormControl;
  public color: FormControl;
  public os: FormControl;
  public processor: FormControl;
  public storage: FormControl;
  public memory: FormControl;
  public camera: FormControl;
  public model: FormControl;
  public battery: FormControl;
  public price: FormControl;
  public resolution: FormControl;
  public description: FormControl;
  public imageUrl: FormControl;

  public editForm: FormGroup;

  public errorMessage: string;
  public successMessage: string;

  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    const detailsId = (+this.activateRoute.snapshot.params['id']);
    // this.product = this.productsService.getById(detailsId)
    //   .subscribe(product => {
    //     this.product = product;
    //   });
    this.product = this.activateRoute.snapshot.data['product/detailsId'];
    this.buildEditProductFormsData();
  }

  buildEditProductFormsData() {

    this.name  = new FormControl(this.product.name, [
      Validators.required
    ]);

    this.size  = new FormControl(this.product.size, [
      Validators.required
    ]);

    this.color  = new FormControl(this.product.color, [
      Validators.required
    ]);

    this.os  = new FormControl(this.product.os, [
      Validators.required
    ]);

    this.processor  = new FormControl(this.product.processor, [
      Validators.required
    ]);

    this.storage  = new FormControl(this.product.storage, [
      Validators.required
    ]);

    this.memory  = new FormControl(this.product.memory, [
      Validators.required
    ]);

    this.camera  = new FormControl(this.product.camera, [
      Validators.required
    ]);

    this.model  = new FormControl(this.product.model, [
      Validators.required
    ]);

    this.battery  = new FormControl(this.product.battery, [
      Validators.required
    ]);

    this.price  = new FormControl(this.product.price, [
      Validators.required
    ]);

    this.resolution  = new FormControl(this.product.resolution, [
      Validators.required
    ]);

    this.description  = new FormControl(this.product.description, [
      Validators.required
    ]);

    this.imageUrl  = new FormControl(this.product.imageUrl, [
      Validators.required,
      Validators.pattern('https?://.+')
    ]);

    this.editForm = new FormGroup({
      name: this.name,
      size: this.size,
      color: this.color,
      os: this.os,
      processor: this.processor,
      storage: this.storage,
      memory: this.memory,
      camera: this.camera,
      model: this.model,
      battery: this.battery,
      price: this.price,
      resolution: this.resolution,
      description: this.description,
      imageUrl: this.imageUrl
    });
  }

  update(productData) {
    const productUpdateInfo: IProduct = {
      name: productData.name,
      size: productData.size,
      color: productData.color,
      os: productData.os,
      processor: productData.processor,
      storage: productData.storage,
      memory: productData.memory,
      camera: productData.camera,
      model: productData.model,
      battery: productData.battery,
      price: productData.price,
      resolution: productData.resolution,
      description: productData.description,
      imageUrl: productData.imageUrl,
      id: productData.id,
      brand: productData.brand,
      year: productData.year,
      ownerUsername: productData.ownerUsername,
      dateAdded: productData.dateAdded,
    };

    const handleSuccessResponse = (updatedProduct: IProduct) => {
      this.successMessage = 'Profile has been updated';
      this.product = updatedProduct;

    };
    const handleError = (error: IError) => {
      this.successMessage = undefined;
      this.errorMessage = error.message;
      this.editForm.markAsUntouched();
    };

    this.productsService.update(productUpdateInfo, this.product.id)
      .subscribe(handleSuccessResponse, handleError);
  }

}
