import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  map: any;
  @ViewChild('mapElement') mapElement: any;

  constructor() { }

  ngOnInit(): void {

   }

  /* ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
    center: { lat: 21.0312695, lng: 105.7818161 },
    zoom: 18,
    });

  } */
}
