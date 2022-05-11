import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { fromEvent, observable, Observable, Subscription } from 'rxjs';
import { throttleTime, scan, finalize } from 'rxjs/operators';
import { CategoryJsonService } from '../../service/category-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
@Component({
  selector: 'app-cacti',
  templateUrl: './cacti.component.html',
  styleUrls: ['./cacti.component.scss']
})
export class CactiComponent implements OnInit {

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
    private categories: CategoryJsonService,
    private storage: AngularFireStorage
  ) { }
  selectedFile: any;
  fb: string | undefined;
  downloadURL: Observable<string> | undefined;

  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const  fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  productList:any = []
  currentList:any = []

  ngOnInit(): void {
  this.categories.getCategory().subscribe(data => {
    this.currentList = data;
    this.productList = this.currentList.filter((el:any) => el.type === 'cacti')
    console.log(this.productList)
   })
  }
}
