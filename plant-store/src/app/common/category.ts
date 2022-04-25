interface Categories {
   id: number;
   productName: string;
   imageUrl: string;
   desc: string;
   price: number;
 }


export class Category implements Categories{
   id!: number;
   productName!: string;
   imageUrl!: string;
   desc!: string;
   price!: number;
 }
