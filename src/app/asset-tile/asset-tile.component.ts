import { Component, OnInit, Input } from '@angular/core';
import { MdCard, MdCardTitle, MdCardSubtitle, MdCardHeader, MdCardContent } from '@angular/material';

@Component({
  selector: 'app-asset-tile',
  // providers: [ MdCard, MdCardHeader, MdCardTitle, MdCardSubtitle, MdCardContent ],
  // template: `
  //   <div *dynamicComponent="template; context: model"></div>
  // `,
  templateUrl: './asset-tile.component.html',
  styleUrls: ['./asset-tile.component.scss']
})
export class AssetTileComponent implements OnInit {

  @Input() asset: any;

  template = `<div>Titulo: {{ title }}<br/></div>`;
  // template = `
  // <md-card>
  //   <md-card-header>
  //     <md-card-title>{{ title.main }}</md-card-title>
  //     <md-card-subtitle>{{ subtitle }}</md-card-subtitle>
  //   </md-card-header>
  //   <div class="keyframe-wrapper">
  //     <img class="tile-keyframe" src="{{ keyframeUrl }}">
  //   </div>
  //   <md-card-content>{{ description }}</md-card-content>
  // </md-card>
  // `;

  constructor() {

  }

  ngOnInit() {
  }

}
