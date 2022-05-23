interface Product {
   id?: string;
   productId: number;
   productType: string
   productName: string;
   productImg: string;
   productDesc: string;
   productPrice: number;
}

export class Products implements Product{
  id!: string;
  productId!: number;
  productType!: string
  productName!: string;
  productImg!: string;
  productDesc!: string;
  productPrice!: number;
  qty!: number;
}

export class ProductsOrder{
  id?: string
  itemsOrder!: Products[];
  subTotal!: number;
  textNote!: string;
  destination!: string;
  date!: string;
  userName!: string;
  phoneNumber!: string;
}
