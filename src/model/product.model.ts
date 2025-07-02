export interface ProductDetail {
  key: string;
  value: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  productDetails: ProductDetail[];
  count:number,
  price:string
}
