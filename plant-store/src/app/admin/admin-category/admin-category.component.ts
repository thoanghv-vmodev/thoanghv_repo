import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/common/category';
import { CategoryJsonService } from 'src/app/service/category-json.service';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild ("modalCreateAndEdit") modalCreateAndEdit: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryJsonService,
    private storage: AngularFireStorage,
  ) { }

  categoryForm!: FormGroup;
  isCreate = true;
  listCategory: Category[] = [];
  putId?: string;

  selectedFile: any;
  arrayPicture: any;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      categoryName: ['',Validators.required],
      categoryImg: ['']
    })

    this.categoryService.getCategory().subscribe(
      data => {
        this.listCategory = data;
      }
    )
  }

  openModalCreateCategory() {
    this.isCreate = true;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.categoryForm.reset();
  }

  closeModal() {
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
    this.categoryForm.reset();
  }
  // @TODO: add type
  openModalEditCategory(data: Category) {
    this.isCreate = false;

    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');

    this.putId = data.id + '';

    this.categoryForm.patchValue({
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      categoryImg: data.categoryImg
    })
    console.log('data importEdit:' ,data)

  }

  Save() {
    this.closeModal();
    // console.log(this.categoryForm.value);

    if(this.isCreate == true) {
      this.categoryService.postCategory(this.categoryForm.value).subscribe((dataCreate: Category) => {
        console.log('data Create',dataCreate)
      })
    }
    else {
      this.categoryForm.get('categoryImg')?.setValue(this.arrayPicture)
      let putCategory = { // lay id de put theo id
      ...this.categoryForm.value,
      id: this.putId
      }
      this.categoryService.putCategory(this.putId, putCategory).subscribe(dataPut => { // truyen id vao lam key name
          // console.log('data Put', dataPut)
      })

    }
  }

  onDeleteCategory(data: Category) { // data param
    if(confirm('Are you sure delete?') == true) {
      this.categoryService.deleteCategory(data).subscribe( dataDelete => {
        // console.log(dataDelete)
         }
      )
    }
  }

 onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `CategoryImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`CategoryImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.arrayPicture = url;
              this.categoryForm.get('categoryImg')?.setValue(url)
            }
            console.log('đây là url',this.arrayPicture);
          });
        })
      )
      .subscribe(data => {
        if (data) {
          console.log(data);
        }
      });
  }


}
