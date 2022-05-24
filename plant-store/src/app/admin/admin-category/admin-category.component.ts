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
  @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryJsonService,
    private storageFb: AngularFireStorage,
  ) { }

  categoryForm!: FormGroup;
  isCreate = true;
  listCategory: Category[] = [];
  putId?: string;

  selectedFile: any;
  categoryPicture: string | undefined;
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      categoryName: ['',Validators.required],
      categoryImg: ['']
    })

    this.getCategory()
  }

  getCategory() {
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
    if(this.isCreate == true) {
      this.categoryService.postCategory(this.categoryForm.value).subscribe((dataCreate) => {
        console.log('data Create',dataCreate)
        // this.listCategory.push(this.categoryForm.value)
        this.getCategory()
      })
    }
    else {
      let putCategory = { // lay id de put theo id
      ...this.categoryForm.value,
      id: this.putId
      }
      this.categoryForm.get('categoryImg')?.setValue(this.categoryPicture)
      this.categoryService.putCategory(this.putId, putCategory).subscribe(dataPut => { // truyen id vao lam key name
        this.getCategory()
      })
    }
  }

  onDeleteCategory(data: Category) { // data param
    if(confirm('Are you sure delete?') == true) {
      this.categoryService.deleteCategory(data).subscribe( dataDelete => {
        this.getCategory()
      }
  )}}

  onFileSelected(event:any) {
    this.loading?.nativeElement.classList.add('dis-block')

    var   time = Date.now();
    const file = event.target.files[0];
    const filePath = `CategoryImages/${time}`;
    const fileRef = this.storageFb.ref(filePath);
    const upTask = this.storageFb.upload(`${filePath}`, file);
    upTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.categoryPicture = url;
              this.categoryForm.get('categoryImg')?.setValue(url)
              this.loading?.nativeElement.classList.remove('dis-block')
            }
            console.log('đây là url',this.categoryPicture);
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
