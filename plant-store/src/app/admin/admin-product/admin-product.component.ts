import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/common/category';
import { Products } from 'src/app/common/product';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';
import { ProductJsonService } from 'src/app/service/product-json.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  @ViewChild ("modalCreateAndEdit") modalCreateAndEdit: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;
  @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;

  constructor(
    private fb: FormBuilder,
    private productService: ProductJsonService,
    private categoryService: CategoryJsonService,
    private storageFb: AngularFireStorage,
    private confirmModal: ModalConfirmService
  ) { }

  productForm!: FormGroup;
  isCreate = true;
  listProduct: Products[] = [];
  categoryList: Category[] = [];
  putId?: string;
  searchValue!: string;
  currentDate: any;

  selectedFile: any;
  productPicture: string | undefined;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [''],
      productType: [''],
      productImg: [''],
      productDesc: [''],
      productPrice: [''],
    });
    this.getListProduct();
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(data => {
      this.categoryList = data;
    })
  }

  getListProduct() {
    this.productService.getProduct().subscribe(
      data => {
         this.listProduct = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    )
  }

  openModalCreateCategory() {
    this.isCreate = true;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    // this.productForm.reset();
    this.productPicture = '';
  }

  closeModal() {
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
    // this.productForm.reset();
    this.productPicture = '';
  }

  openModalEditProduct(data: Products) {
    this.isCreate = false;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.putId = data.id + '';
    this.productPicture = data.productImg;
    this.currentDate = data.date;
    console.log(this.currentDate)

    this.productForm.patchValue({
      productName: data.productName,
      productType: data.productType,
      productImg: data.productImg,
      productDesc: data.productDesc,
      productPrice: data.productPrice,
    })
    console.log('data importEdit:' ,data)
  }

  Save():void {
    if(this.isCreate == true ) {
      let date = new Date()
      let putProduct = {
      ...this.productForm.value,
      date: date,
      }
      this.productService.postProduct(putProduct).subscribe((dataCreate) => {
        console.log('data Create',dataCreate)
        this.listProduct.push(this.productForm.value)
        this.getListProduct();
      })
    }
    else {
      let putProduct = {
      ...this.productForm.value,
      id: this.putId,
      date: this.currentDate
      }
      this.productForm.get('productImg')?.setValue(this.productPicture)
      this.productService.putProduct(this.putId, putProduct).subscribe(dataPut => { // truyen id vao lam key name
          console.log('data Put', dataPut)
          this.getListProduct();
      })
    }
    this.closeModal();
  }


  onDeleteProduct(itemDelete: any) {
    this.confirmModal.confirm('Please confirm', 'Do you really want to delete?')
    .then((confirmed) => {
      if(confirmed == true) {
        this.productService.deleteProduct(itemDelete).subscribe( item => {
        this.getListProduct();
        })
      }
    })
    .catch(() => console.log('User dismissed the dialog'));
  }


  onFileSelected(event:any) {
    this.loading?.nativeElement.classList.add('dis-block')

    var   time = Date.now();
    const file = event.target.files[0];
    const filePath = `ProductImages/${time}`;
    const fileRef = this.storageFb.ref(filePath);
    const upTask = this.storageFb.upload(`${filePath}`, file);
    upTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          if(file !== '') {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url !== '' && url !== null) {
                this.productPicture = url;
                this.productForm.get('productImg')?.setValue(url)
                this.loading?.nativeElement.classList.remove('dis-block')
              }
              console.log(this.productPicture);
            });
          }
        })
      )
      .subscribe(active => {
        if (active) {
          console.log(active);
        }
      });
  }

  Search() {
    if(!this.listProduct || !this.searchValue){
      return this.ngOnInit();
    }
    return this.listProduct = this.listProduct.filter(product =>
      product.productName.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
      product.productPrice.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase())
      // || product.productId.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase()),
      )
  }

  filterProductItem(event: any) {
    // console.log(event.target.value)
    if(event.target.value != '') {
      setTimeout(() => {
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.listProduct = data.filter((value: any) => value.productType == event.target.value)
        })
      }, 400);
    } else {
      return this.getListProduct();
    }
  }

}
