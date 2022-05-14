import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private categoryService: CategoryJsonService
  ) { }

  categoryForm!: FormGroup;
  isCreate = true;
  listCategory: Category[] = [];
  putId?: string;


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      categoryName: ['',Validators.required],
      categoryImg: ['', Validators.required]
    })

    this.categoryService.getCategory().subscribe(
      data => {
        this.listCategory = data;
        console.log(data)
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
    // console.log(this.categoryForm.value);

    let putCategory = { // lay id de put theo id
      ...this.categoryForm.value,
      id: this.putId
    }

    if(this.isCreate == true) {
      this.categoryService.postCategory(this.categoryForm.value).subscribe((dataCreate: Category) => {
        // console.log('data Create',dataCreate)
      })
    }
    else {
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
}
