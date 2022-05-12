import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/common/category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild ("modalCreateAndEdit") modalCreateAndEdit: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;


  constructor(
    private fb: FormBuilder
  ) { }

  categoryForm!: FormGroup;


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      idCategory: [''],
      categoryName: [''],
      categoryImg: ['']
    })
  }

  createCategory() {
    console.log(this.categoryForm.value)
  }

  basicTable: Category[] = [
  {
    id: 0,
    categoryName: 'cacti',
    imgCategory: 'https://static.wixstatic.com/media/697bc8_8bf7131cfd3547e9bd54d9f4f57f3e74~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_8bf7131cfd3547e9bd54d9f4f57f3e74~mv2_d_1920_1920_s_2.jpg'
  },
  {
    id: 1,
    categoryName: 'plants',
    imgCategory: 'https://static.wixstatic.com/media/697bc8_8267510d9e19448297fc161a522881f1~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_8267510d9e19448297fc161a522881f1~mv2_d_1920_1920_s_2.jpg'
  },
  {
    id: 2,
    categoryName: 'succulents',
    imgCategory: 'https://static.wixstatic.com/media/697bc8_b067d0a4b500479b8a3930782976779e~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_b067d0a4b500479b8a3930782976779e~mv2_d_1920_1920_s_2.jpg'
  }
  ]


  openModalCreateCategory() {
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
   this.modalCreateAndEdit?.nativeElement.classList.add('dis-block');
   this.overlay?.nativeElement.classList.add('dis-block');

   this.categoryForm
  }

  /* Save(event: any) {
    event.preventDefault();
    this.closeModal();
    this.categories.postCategory(this.category).subscribe(data => {
      console.log(data)
    })
  } */

 /*  Delete(data: Category) { // data param
    if(confirm('Bạn chắc chắn muốn xóa') == true) {
      this.productList = this.productList.filter((el:any) => el !== data)
      this.categories.deleteCategory(data.id).subscribe();
    }
  } */

  Delete() { // data param
    if(confirm('Bạn chắc chắn muốn xóa') == true) {
     /*  this.productList = this.productList.filter((el:any) => el !== data)
      this.categories.deleteCategory(data.id).subscribe(); */
    }
  }
}
