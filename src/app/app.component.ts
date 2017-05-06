import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'app/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yDam - Beyond Digital Asset Management';

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    this._translate.use('en');
  }
}
