import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesListService } from 'src/app/service/countries-list.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { OrderListService } from 'src/app/service/order-list.service';
import { ToastService } from 'src/app/service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Products } from 'src/app/models/product';

@Component({
  selector: 'app-user-check-out',
  templateUrl: './user-check-out.component.html',
  styleUrls: ['./user-check-out.component.scss']
})
export class UserCheckOutComponent implements OnInit {

  constructor(
    private countriesService: CountriesListService,
    private orderService: OrderListService,
    private router: Router,
    private msg: MessengerService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  formUpdateInfo!: FormGroup
  productListCheckOut: Products[] = [];
  userCheckOut: any = [];
  listProvinces: any;
  cartTotal: number = 0;

  ngOnInit(): void {
    this.getProductCheckOut();
    this.subTotal();
    this.getListCountry();
    this.getNumOfProduct();

    this.formUpdateInfo = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), this.noLetters, Validators.minLength(10)]],
      province: ['', Validators.required],
      specificAddress: ['', Validators.required],
      textNote: [''],
    })
  }

  get province() { return this.formUpdateInfo.get('province'); }

  get specificAddress() { return this.formUpdateInfo.get('specificAddress'); }

  get userName() {return this.formUpdateInfo.get('userName')}

  get phoneNumber() {return this.formUpdateInfo.get('phoneNumber')}


  noLetters(control: AbstractControl): ValidationErrors | null {
    if(!/^[0-9]+$/.test(control.value)) {
      return { noLetter: true}
    }
    return null
  };

  getNumOfProduct() {
      let storage:any = localStorage.getItem('products')
      let storageItem = JSON.parse(storage).length
      if(storageItem <= 0) {
        localStorage.removeItem('productCheckOut');
      }
  }

  getListCountry() {
    this.listProvinces = this.countriesService.getProvincesList()
  }

  getProductCheckOut() {
    let storage = localStorage.getItem('productCheckOut')
    if(storage) {
      this.productListCheckOut = JSON.parse(storage)
    }
    let user = localStorage.getItem('user');
    if(user) {
      this.userCheckOut = JSON.parse(user);
    }
  }

  subTotal() {
    this.cartTotal = 0;
    this.productListCheckOut.forEach(item => {
      this.cartTotal += (item.productPrice * item.qty)
    });
  }

  openModalBeforeCheckOut(content: any) {
    this.modalService.open(content, {})
    this.formUpdateInfo.patchValue({
      userName: this.userCheckOut.userName,
      phoneNumber: this.userCheckOut.phoneNumber,
    })
  }

  closeModalBeforeCheckOut(){
    this.modalService.dismissAll()
  };

  checkOut() {
    if(this.formUpdateInfo.valid) {
      let date = Date.now()
      let objCheckout= {
        ...this.formUpdateInfo.value,
        itemsOrder: this.productListCheckOut,
        subTotal: this.cartTotal,
        date: date
      };
      this.toastService.showCheckoutSuccess();
      setTimeout(() => {
          this.orderService.postProductOrder(objCheckout).subscribe(data => {
            localStorage.removeItem('productCheckOut');
            this.router.navigate(['home-page']);
            let obj = {
              ...this.productListCheckOut
            }
            this.msg.sendProductOnOrder(obj)
            // this.msg.sendItemInCart([]);
          })
          this.closeModalBeforeCheckOut()
      }, 500);
      }else {
        Object.values(this.formUpdateInfo.controls).forEach(control => {
          if(control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({onlySelf: true})
          }
        })
    }
  }

}
