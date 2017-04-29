import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-config-toolbar',
  templateUrl: './config-toolbar.component.html',
  styleUrls: ['./config-toolbar.component.scss']
})
export class ConfigToolbarComponent implements OnInit {

  @Output() clickMenuEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  clickMenu(): void {
    this.clickMenuEvent.emit();
  }
}
