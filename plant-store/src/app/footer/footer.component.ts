import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  constructor() { }

  map: any;

  @ViewChild('mapElement') mapElement: any;



  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
    center: { lat: 21.0312695, lng: 105.7818161 },
    zoom: 18,
    });

   const marker: any = new google.maps.Marker({
    position: { lat: 21.0312695, lng: 105.7818161 },
    map: Map,
    });


   const infowindow = new google.maps.InfoWindow({
    content: "<p>Marker Location:" + marker.getPosition() + "</p>",
    });

   google.maps.event.addListener(marker, "click", () => {
    infowindow.open(this.map, marker);
    });
  }
}
