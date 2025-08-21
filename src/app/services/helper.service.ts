import { Injectable } from "@angular/core";
import { ProductModel } from "../models/productModel";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  dynamicSort(products: ProductModel[], sortField: keyof ProductModel, sortOrder: string): ProductModel[] {
    return products.sort((a, b) => {
      let comparison = 0;

      const aValue = a[sortField] ?? '';
      const bValue = b[sortField] ?? '';

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}