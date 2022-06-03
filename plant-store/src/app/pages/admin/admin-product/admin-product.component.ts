import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/product';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';
import { ProductJsonService } from 'src/app/service/product-json.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminProductComponent implements OnInit {

  @ViewChild ("modalCreateAndEdit") modalCreateAndEdit: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;
  @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;
  productForm!: FormGroup;
  isCreate = true;
  productList: Products[] = [];
  categoryList: Category[] = [];
  putId?: string;
  searchValue!: string;
  currentDate: any;
  pagination: number = 1;

  selectedFile: any;
  productImage: string | undefined;
  downloadURL: Observable<string> | undefined;
  listSortValue = [
  {
    sate: 'hight',
    title: 'Price (hight to low)'
  },
  {
    sate: 'low',
    title: 'Price (low to high)'
  },
  {
    sate: 'new',
    title: 'Time (new to old)'
  },
  {
    sate: 'old',
    title: 'Time (old to new)'
  }
  ]

  constructor(
    private fb: FormBuilder,
    private productService: ProductJsonService,
    private categoryService: CategoryJsonService,
    private storageFb: AngularFireStorage,
    private modalConfirm: ModalConfirmService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [''],
      productType: [''],
      productImg: [''],
      productDesc: [''],
      productPrice: [''],
    });
    this.getProductList();
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(data => {
      this.categoryList = data;
    })
  }

  getProductList() {
    this.productService.getProduct().subscribe(
      data => {
         this.productList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    )
  }

  openModalCreateCategory() {
    this.isCreate = true;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.productImage = '';
    this.productForm.reset();
  }

  closeModal() {
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
    this.productImage = '';
    this.productForm.reset();
  }

  openModalEditProduct(data: Products) {
    this.isCreate = false;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.putId = data.id + '';
    this.productImage = data.productImg;
    this.currentDate = data.date;

    this.productForm.patchValue({
      productName: data.productName,
      productType: data.productType,
      productImg: data.productImg,
      productDesc: data.productDesc,
      productPrice: data.productPrice,
    })
  }

  /**
   * - Chức năng hàm Save():
   * # this.isCreate == true: sẽ được hiểu là tạo mới product
   * - tạo 1 biến date để lấy current date
   * - tạo 1 biến putProject{} để chứa productForm.value và date
   * - gọi service productService, truyền object putProduct{} vào hàm postProduct()
   *   sau đó request API.
   * # else this.isCreate == false: là hàm edit product
   * - tạo 1 object putProduct{} rest value trong productForm, set thêm id để sửa đúng product
   * - lấy control name "productImg" và setValue là this.productImage
   */
  Save():void {
    if(this.isCreate == true ) {
      let date = new Date();
      let putProduct = {
      ...this.productForm.value,
      date: date,
      }
      this.productService.postProduct(putProduct).subscribe((dataCreate) => {
        this.getProductList();
      })
    }
    else {
      let putProduct = {
      ...this.productForm.value,
      id: this.putId,
      date: this.currentDate
      }
      this.productForm.get('productImg')?.setValue(this.productImage)
      this.productService.putProduct(this.putId, putProduct).subscribe(dataPut => {
          this.getProductList();
      })
    }
    this.closeModal();
  }


  onDeleteProduct(itemDelete: any) {
    this.modalConfirm.confirm('Please confirm', 'Do you really want to delete?')
    .then((confirmed) => {
      if(confirmed == true) {
        this.productService.deleteProduct(itemDelete).subscribe( item => {
        this.getProductList();
        })
      }
    })
    .catch((err) => console.log(err));
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
                this.productImage = url;
                this.productForm.get('productImg')?.setValue(url)
                this.loading?.nativeElement.classList.remove('dis-block')
              }
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
    if(!this.productList || !this.searchValue){
      return this.ngOnInit();
    }
    this.productService.getProduct().subscribe((data :Products[]) => {
      return this.productList = data.filter(product =>
      product.productName.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
      product.productPrice.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase()))
    })
  }

  filterProductItem(event: any) {
    if(event.target.value != '') {
        this.productService.getProduct().subscribe((data :Products[]) => {
        return this.productList = data.filter((value: Products) => value.productType == event.target.value)
        })
    } else {
      return this.getProductList();
    }
  }

  sortProductItem(event: any) {
    switch(event.target.value) {
      case 'hight':
        this.productList = this.productList.sort((a, b) => b.productPrice - a.productPrice)
      break;
      case 'low':
        this.productList = this.productList.sort((a, b) => a.productPrice - b.productPrice)
      break;
      case 'new':
        this.productList = this.productList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break;
      case 'old':
        this.productList = this.productList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break;
      default: this.getProductList();
    }
  }

}
