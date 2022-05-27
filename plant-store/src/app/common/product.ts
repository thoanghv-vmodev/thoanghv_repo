interface Product {
   id?: string;
   productType: string
   productName: string;
   productImg: string;
   productDesc: string;
   productPrice: number;
}

export class Products implements Product{
  id!: string;
  productType!: string
  productName!: string;
  productImg!: string;
  productDesc!: string;
  productPrice!: number;
  qty!: number;
  date!: string;
}

export class ProductsOrder{
  id?: string
  itemsOrder!: Products[];
  subTotal!: number;
  textNote!: string;
  province!: string;
  specificAddress!: string;
  date!: string;
  userName!: string;
  phoneNumber!: string;
}
