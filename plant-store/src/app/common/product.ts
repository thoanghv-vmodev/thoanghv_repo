interface Product {
   id: number;
   productName: string;
   imageUrl: string;
   desc: string;
   price: number;
 }


export class Products implements Product{
   id!: number;
   productName!: string;
   imageUrl!: string;
   desc!: string;
   price!: number;
 }
