import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Products } from 'src/app/common/product';
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
    private storage: AngularFireStorage,
  ) { }

  productForm!: FormGroup;
  isCreate = true;
  listProduct: Products[] = [];
  putId?: string;

  selectedFile: any;
  productPicture: string | undefined;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: [''],
      productName: [''],
      productType: [''],
      productImg: [''],
      productDesc: [''],
      productPrice: [''],
    })

    this.productService.getProduct().subscribe(
      data => {
        this.listProduct = data;
        // console.log(this.listProduct)
      }
    )
  }

  openModalCreateCategory() {
    this.productForm.reset();
    this.isCreate = true;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
  }

  closeModal() {
    this.productForm.reset();
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
  }
  // @TODO: add type
  openModalEditCategory(data: Products) {
    this.isCreate = false;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.putId = data.id + '';
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

  onDeleteCategory(data: Products) { // data param
    if(confirm('Are you sure delete?') == true) {
      this.productService.deleteProduct(data).subscribe( dataDelete => {
        // console.log(dataDelete)
      }
  )}}


  Save():void {
    this.closeModal();
    if(this.isCreate == true) {
      this.productService.postProduct(this.productForm.value).subscribe((dataCreate: Products) => {
        console.log('data Create',dataCreate)
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
      })
    }
  }

  onFileSelected(event:any) {
    this.loading?.nativeElement.classList.add('dis-block')

    var   time = Date.now();
    const file = event.target.files[0];
    const filePath = `ProductImages/${time}`;
    const fileRef = this.storage.ref(filePath);
    const upTask = this.storage.upload(`${filePath}`, file);
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
            console.log('đây là url',this.productPicture);
          });
        })
      )
      .subscribe(active => {
        if (active) {
          console.log(active);
        }
      });
  }


}
