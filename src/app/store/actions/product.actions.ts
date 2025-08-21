// import { createAction, props } from '@ngrx/store';
// import { ProductModel } from 'src/app/models/productModel';


// export const loadProducts = createAction(
//   '[Product] Load Products',
//   props<{ search: string }>()
// );
// export const loadProductsSuccess = createAction(
//   '[Product] Load Products Success',
//   props<{ products: ProductModel[], total: number }>()
// );
// export const loadProductsFailure = createAction(
//   '[Product] Load Products Failure',
//   props<{ error: string }>()
// );


// export const addProduct = createAction(
//   '[Product] Add Product',
//   props<{ product: ProductModel }>()
// );
// export const addProductSuccess = createAction(
//   '[Product] Add Product Success',
//   props<{ product: ProductModel }>()
// );
// export const addProductFailure = createAction(
//   '[Product] Add Product Failure',
//   props<{ error: string }>()
// );


// export const editProduct = createAction(
//   '[Product] Edit Product',
//   props<{ id: string; product: ProductModel }>()
// );
// export const editProductSuccess = createAction(
//   '[Product] Edit Product Success',
//   props<{ product: ProductModel }>()
// );
// export const editProductFailure = createAction(
//   '[Product] Edit Product Failure',
//   props<{ error: string }>()
// );

// export const deleteProduct = createAction(
//   '[Product] Delete Product',
//   props<{ id: string }>()
// );
// export const deleteProductSuccess = createAction(
//   '[Product] Delete Product Success',
//   props<{ id: string }>()
// );
// export const deleteProductFailure = createAction(
//   '[Product] Delete Product Failure',
//   props<{ error: string }>()
// );


import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ProductModel } from 'src/app/models/productModel';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load': props<{ props: any }>(),
    'Load Success': props<{ products: ProductModel[], totalCount: number }>(),
    'Load Failure': props<{ error: string }>(),

    'Add': props<{ product: ProductModel }>(),
    'Add Success': emptyProps(),
    'Add Failure': props<{ error: string }>(),

    'Update': props<{ id: string; product: ProductModel }>(),
    'Update Success': emptyProps(),
    'Update Failure': props<{ error: string }>(),

    'Delete': props<{ id: string }>(),
    'Delete Success': emptyProps(),
    'Delete Failure': props<{ error: string }>(),

    'Delete Many': props<{ ids: string[] }>(),
    'Delete Many Success': emptyProps(),
    'Delete Many Failure': props<{ error: string }>(),
  }
});