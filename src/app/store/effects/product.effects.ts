import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from '../actions/product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductsEffects {
  actions$ = inject(Actions);
  productService = inject(ProductService);
  router = inject(Router);
  toastr = inject(ToastrService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.load),
      mergeMap(({props}) =>
        this.productService.getProducts(props).pipe(
          map(response => {
            const totalCount = parseInt(response.headers.get('X-Total-Count')|| '0', 0);
            return ProductsActions.loadSuccess({ products: response.body, totalCount: totalCount}) }),
          catchError(err => of(ProductsActions.loadFailure({ error: String(err.message ?? err) })))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.add),
      mergeMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map(p => {
            this.router.navigate(['/products']);
            this.toastr.success('Product added successfully');
            return ProductsActions.addSuccess();
          }),
          catchError(err => of(ProductsActions.addFailure({ error: String(err.message ?? err) })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.update),
      mergeMap(({ product , id}) =>
        this.productService.editProduct(id,product).pipe(
          map(p => {
            this.router.navigate(['/products']);
            this.toastr.success('Product updated successfully');
            return ProductsActions.updateSuccess();
          }),
          catchError(err => of(ProductsActions.updateFailure({ error: String(err.message ?? err) })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.delete),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => {
            this.toastr.success('Product deleted successfully');
            return ProductsActions.load({ props: { "_sort": "createdDate", "_order": "DESC" } });
          }),
          catchError(err => of(ProductsActions.deleteFailure({ error: String(err.message ?? err) })))
        )
      )
    )
  );

  deleteMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteMany),
      mergeMap(({ ids }) =>
        this.productService.deleteManyProducts(ids).pipe(
          map(() => {
            this.toastr.success('Products deleted successfully');
            return ProductsActions.load({ props: { "_sort": "createdDate", "_order": "DESC" } });
          }),
          catchError(err => of(ProductsActions.deleteManyFailure({ error: String(err.message ?? err) })))
        )
      )
    )
  );
}
