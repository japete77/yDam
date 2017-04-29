import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AppConstants } from '../app.constants';
import { CommandService } from '../services/command/command.service';
import { TranslateService } from "app/translate";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  selectedMenu: string;
  menuItems: MenuItem[];

  constructor(private iconRegistry: MdIconRegistry,
              private domSanitizer: DomSanitizer,
              private commandService: CommandService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'ydam-logo',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/ydam-logo.svg'));

    this.commandService.sendCmd$.subscribe(command => {
      if (command === AppConstants.CMD_TOGGLE_NAV) {
        this.toggleSideNav();
      }
    });
  }

  ngOnInit() {
    this.menuItems = [
      {
        id: 'library',
        name: this.translateService.instant('Library'),
        icon: 'local_library'
      },
      {
        id: 'worklist',
        name: this.translateService.instant('Worklist'),
        icon: 'playlist_add_check'
      },
      {
        id: 'config',
        name: this.translateService.instant('Configuration'),
        icon: 'build'
      },
    ];
  }

  toggleSideNav(): void {
    this.sidenav.toggle();
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
}

export class MenuItem {
  id: string;
  name: string;
  icon: string;
}
