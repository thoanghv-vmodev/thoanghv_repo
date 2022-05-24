import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/common/category';
import { Products } from 'src/app/common/product';
import { CategoryJsonService } from 'src/app/service/category-json.service';
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
  ) { }

  productForm!: FormGroup;
  isCreate = true;
  listProduct: Products[] = [];
  listCategory: Category[] = [];
  putId?: string;
  searchValue!: string;

  selectedFile: any;
  productPicture: string | undefined;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productName: [''],
      productType: [''],
      productImg: [''],
      productDesc: [''],
      productPrice: [''],
    });
    this.getListProduct();
    this.getListCategory();
  }

  getListCategory() {
    this.categoryService.getCategory().subscribe(data => {
      this.listCategory = data;
      console.log(this.listCategory)
    })
  }

  getListProduct() {
    this.productService.getProduct().subscribe(
      data => {
        this.listProduct = data;
        console.log(this.listProduct)
      }
    )
  }

  openModalCreateCategory() {
    this.isCreate = true;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.productForm.reset();
    this.productPicture = '';
  }

  closeModal() {
    this.productForm.reset();
    this.productPicture = '';
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
  }
  // @TODO: add type
  openModalEditCategory(data: Products) {
    this.isCreate = false;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.putId = data.id + '';
    this.productPicture = data.productImg;

    this.productForm.patchValue({
      productId: data.productId,
      productName: data.productName,
      productType: data.productType,
      productImg: data.productImg,
      productDesc: data.productDesc,
      productPrice: data.productPrice,
    })
    console.log('data importEdit:' ,data)
  }

  Save():void {
    this.closeModal();
    console.log(this.productForm.value)
    if(this.isCreate == true ) {
      this.productService.postProduct(this.productForm.value).subscribe((dataCreate) => {
        console.log('data Create',dataCreate)
        // this.listProduct.push(this.productForm.value)
        this.getListProduct();
      })
    }
    else {
      let putCategory = { // lay id de put theo id
      ...this.productForm.value,
      id: this.putId
      }
      this.productForm.get('productImg')?.setValue(this.productPicture)
      this.productService.putProduct(this.putId, putCategory).subscribe(dataPut => { // truyen id vao lam key name
          // console.log('data Put', dataPut)
          this.getListProduct();
      })
    }
  }

   onDeleteCategory(data: Products) { // data param
    if(confirm('Are you sure delete?') == true) {
      this.productService.deleteProduct(data).subscribe( dataDelete => {
        // console.log(dataDelete)
        this.getListProduct();
      }
  )}}


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
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.productPicture = url;
              this.productForm.get('productImg')?.setValue(url)
              this.loading?.nativeElement.classList.remove('dis-block')
            }
            console.log(this.productPicture);
          });
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
      product.productPrice.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase()) ||
      product.productId.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase()),
      )
  }

}
