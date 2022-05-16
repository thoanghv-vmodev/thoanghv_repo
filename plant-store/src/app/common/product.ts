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
 }
