import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() errorText: string;
  @Output() closeEvent = new EventEmitter<any>();
  public errorPopup: any;
  constructor() { }

  ngOnInit() {
    this.errorPopup = true;
  }
  errorAccept() {
    this.errorPopup = false;
    this.closeEvent.emit();
  }

}
