export class User {
  id?: string;
  email!: string;
  password!: string;
}

export interface UserRegister {
   name: string;
   email: string;
   phoneNumber: number;
   password: string;
}
