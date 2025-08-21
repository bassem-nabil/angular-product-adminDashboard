export interface ProductModel {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdDate: number;
  status: 'Active' | 'Inactive';
  image?: string;
  checked?: boolean;
}
