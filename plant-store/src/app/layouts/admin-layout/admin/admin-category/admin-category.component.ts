import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/common/models/category';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild ("modalCreateAndEdit") modalCreateAndEdit: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;
  @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;
  categoryForm!: FormGroup;
  isCreate = true;
  categoryList: Category[] = [];
  putId?: string;
  currentDate: any;

  selectedFile: any;
  categoryImage: string | undefined;
  downloadURL: Observable<string> | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryJsonService,
    private storageFb: AngularFireStorage,
    private confirmModal: ModalConfirmService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: [''],
      categoryImg: ['']
    })

    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categoryList = data.sort((a, b) => new Date(b.dateCategory).getTime() - new Date(a.dateCategory).getTime());
      }
    )
  }

  openModalCreateCategory() {
    this.isCreate = true;
    this.categoryImage = '';
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.categoryForm.reset();
  }

  closeModal() {
    this.overlay?.nativeElement.classList.remove('dis-block');
    this.modalCreateAndEdit?.nativeElement.classList.remove('dis-block');
  }

  openModalEditCategory(data: Category) {
    this.isCreate = false;
    this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
    this.putId = data.id + '';
    this.categoryImage = data.categoryImg;
    this.currentDate = data.dateCategory;

    this.categoryForm.patchValue({
      categoryName: data.categoryName,
      categoryImg: data.categoryImg
    })
  }

  Save() {
    this.closeModal();
    if(this.isCreate == true) {
      let date = new Date()
      let createCategory = {
      ...this.categoryForm.value,
      dateCategory: date
      }
      this.categoryService.postCategory(createCategory).subscribe((dataCreate) => {
        this.getCategoryList()
      })
    }
    else {
      let putCategory = {
      ...this.categoryForm.value,
      id: this.putId,
      dateCategory: this.currentDate
      }
      this.categoryForm.get('categoryImg')?.setValue(this.categoryImage)
      this.categoryService.putCategory(this.putId, putCategory).subscribe(dataPut => {
        this.getCategoryList()
      })
    }
  }

  onDeleteCategory(itemDelete: any) {
    this.confirmModal.confirm('Please confirm', 'Do you really want to delete?')
    .then((confirmed) => {
      if(confirmed == true) {
        this.categoryService.deleteCategory(itemDelete).subscribe( dataDelete => {
        this.getCategoryList()
      })
      }
    })
    .catch((err) => console.log(err));
  }

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
              this.categoryImage = url;
              this.categoryForm.get('categoryImg')?.setValue(url)
              this.loading?.nativeElement.classList.remove('dis-block')
            }
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
