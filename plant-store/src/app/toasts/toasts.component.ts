import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef;}
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
