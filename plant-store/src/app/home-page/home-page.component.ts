import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listCategory = [
    {
      id: 0,
      category: 'cacti',
      image: 'https://static.wixstatic.com/media/697bc8_8bf7131cfd3547e9bd54d9f4f57f3e74~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_8bf7131cfd3547e9bd54d9f4f57f3e74~mv2_d_1920_1920_s_2.jpg'
    },
    {
      id: 1,
      category: 'plants',
      image: 'https://static.wixstatic.com/media/697bc8_8267510d9e19448297fc161a522881f1~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_8267510d9e19448297fc161a522881f1~mv2_d_1920_1920_s_2.jpg'
    },
    {
      id: 2,
      category: 'succulents',
      image: 'https://static.wixstatic.com/media/697bc8_b067d0a4b500479b8a3930782976779e~mv2_d_1920_1920_s_2.jpg/v1/fill/w_533,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/697bc8_b067d0a4b500479b8a3930782976779e~mv2_d_1920_1920_s_2.jpg'
    }
  ]




}
