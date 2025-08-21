// import { createReducer, on } from '@ngrx/store';
// import * as ProductActions from '../actions/product.actions';
// import { ProductModel } from 'src/app/models/productModel';

// export interface ProductState {
//   products: ProductModel[];
//   total: number;
//   loading: boolean;
//   error: string | null;
// }

// export const initialState: ProductState = {
//   products: [],
//   total: 0,
//   loading: false,
//   error: null
// };

// export const productReducer = createReducer(
//   initialState,
//   on(ProductActions.loadProducts, state => ({
//     ...state,
//     loading: true
//   })),
//   on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
//     ...state,
//     loading: false,
//     products,
//     total
//   })),
//   on(ProductActions.loadProductsFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error
//   })),
//   on(ProductActions.addProductSuccess, (state, { product }) => ({
//     ...state,
//     products: [...state.products, product]
//   })),
//   on(ProductActions.editProductSuccess, (state, { product }) => ({
//     ...state,
//     products: state.products.map(p => p.id === product.id ? product : p)
//   })),
//   on(ProductActions.deleteProductSuccess, (state, { id }) => ({
//     ...state,
//     products: state.products.filter(p => p.id !== id)
//   }))
// );


import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ProductsActions} from '../actions/product.actions';
import { ProductModel } from 'src/app/models/productModel';

export const productsFeatureKey = 'products';

export interface ProductsState extends EntityState<ProductModel> {
  products: ProductModel[];
  loading: boolean;
  totalCount: number;
  error: string | null;
}

export const producrAdapter = createEntityAdapter<ProductModel>({
  selectId: (p) => p.id,
  sortComparer: (a: ProductModel, b: ProductModel) => b.createdDate - a.createdDate
});

const initialState: ProductsState = producrAdapter.getInitialState({
  products: [],
  loading: false,
  totalCount: 0,
  error: null
});

export const reducer = createReducer(
  initialState,

  on(ProductsActions.load, (s) => ({ ...s, loading: true, error: null })),
  on(ProductsActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(ProductsActions.loadSuccess, (s, { products, totalCount }) => {debugger
    return producrAdapter.setAll(products, { ...s, loading: false, totalCount });
  }),

  on(ProductsActions.updateSuccess, (s) => ({ ...s })),
  on(ProductsActions.deleteSuccess, (s) => ({ ...s })),
  on(ProductsActions.deleteManySuccess, (s) => ({ ...s })),
  on(ProductsActions.addSuccess, (s) => ({ ...s })),

  on(
    ProductsActions.addFailure,
    ProductsActions.updateFailure,
    ProductsActions.deleteFailure,
    ProductsActions.deleteManyFailure,
    (s, { error }) => ({ ...s, error }))
);

export const productsFeature = createFeature({
  name: productsFeatureKey,
  reducer,
});

export const { selectProductsState } = productsFeature;
