import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../_shared/card/card.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/productModel';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions } from 'src/app/store/actions/product.actions';
import { selectProductById } from 'src/app/store/selectors/product.selectors';
import { Observable, Subscription, tap } from 'rxjs';
import { i } from '@angular/cdk/data-source.d-Bblv7Zvh';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ReactiveFormsModule
  ],
  selector: 'app-productsAddEdit',
  templateUrl: './productsAddEdit.component.html',
  styleUrls: ['./productsAddEdit.component.scss']
})
export class ProductsAddEditComponent implements OnInit, OnDestroy {

  productForm!: FormGroup;
  imagePreview: string | null = null;
  productId: string | null = null;
  product$: Subscription | null = null;

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  fb = inject(FormBuilder);


  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.store.dispatch(ProductsActions.load({ props: { id: this.productId } }));
      this.product$ = this.store.select(selectProductById(this.productId)).subscribe(data => {
        this.populateForm(data);
      });
    }
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.product$){
      this.product$.unsubscribe();
    }
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const guid = uuidv4();
    const obj: ProductModel = {
      id: guid,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
      status: this.productForm.value.status,
      createdDate: Date.now(),
      image: this.imagePreview ? this.imagePreview : undefined
    }
    
      if (this.productId) {
        this.store.dispatch(ProductsActions.update({ id: this.productId, product: obj }));
      } else {
        this.store.dispatch(ProductsActions.add({ product: obj }));
      }

    // this.productService.addProduct(obj).subscribe({
    //   next: (data) => {
    //     if (data) {
    //       this.router.navigate(['/products']);
    //     }
    //     setTimeout(() => {
    //     }, 500);
    //   },
    //   error: (err) => {
    //   }
    // });
  }

  onCancel(): void {
    this.productForm.reset();
    this.imagePreview = null;
    const fileInput: HTMLInputElement = document.getElementById('inputImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; 
    }
    this.initForm();
    this.router.navigate(['/products']);
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [''],
      price: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      status: ['Active', [Validators.required]],
      image: [null]
    });
  }

  populateForm(product: ProductModel) {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      status: product.status,
      image: product.image
    });
    this.imagePreview = product.image ? product.image : null;
  }

}
