import { createSelector } from "@ngrx/store";
import { producrAdapter, productsFeature, ProductsState, selectProductsState } from "../reducers/product.reducer";
import { ProductModel } from "src/app/models/productModel";

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = producrAdapter.getSelectors(selectProductsState);

export const selectProductById = (id: string) =>
  createSelector(
    productsFeature.selectProductsState,
    (state) => state.entities[id] as ProductModel
);

export const selectTotalCount = 
 createSelector(
    productsFeature.selectProductsState,
    (state: ProductsState) => state.totalCount
);