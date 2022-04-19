import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthor = false

  private productList = [
    {
      id: 0,
      image: '../../../assets/images/697bc8_d3af74f5f65047b6a2fd713c08524a81_mv2_d_1920_1920_s_2.webp',
      prdName: 'Sương Rồng',
      price: 1222
    },
     {
      id: 1,
      image: '../../../assets/images/697bc8_d3af74f5f65047b6a2fd713c08524a81_mv2_d_1920_1920_s_2.webp',
      prdName: 'Cây Lan',
      price: 99999
    },
    {
      id: 2,
      image: '../../../assets/images/697bc8_d3af74f5f65047b6a2fd713c08524a81_mv2_d_1920_1920_s_2.webp',
      prdName: 'Hoa Đá',
      price: 5349503
    },
    {
      id: 3,
      image: '../../../assets/images/697bc8_d3af74f5f65047b6a2fd713c08524a81_mv2_d_1920_1920_s_2.webp',
      prdName: 'Hoa ',
      price: 344345222
    },
    {
      id: 4,
      image: '../../../assets/images/697bc8_d3af74f5f65047b6a2fd713c08524a81_mv2_d_1920_1920_s_2.webp',
      prdName: 'Cây',
      price: 332323
    },
  ]

  constructor() { }

/* Guard */
  subscribe() {
    this.isAuthor = true
  }

  unSubscribe() {
    this.isAuthor = false
  }

  canExit() {
    if(confirm('Bạn muốn thoát?')) {
      return true
    }
    return false
  }

/* Fake Api */
  getListProduct(): any{
    return this.productList
  }

  getProductById(id: any) {
    return this.productList.find(el => el.id == id)
  }

}
