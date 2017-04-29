import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AppConstants } from '../app.constants';
import { CommandService } from '../services/command/command.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  selectedMenu: string;
  menuItems: MenuItem[] = [
    {
      id: 'library',
      name: 'Library',
      icon: 'local_library'
    },
    {
      id: 'worklist',
      name: 'Worklist',
      icon: 'playlist_add_check'
    },
    {
      id: 'config',
      name: 'Configuration',
      icon: 'build'
    },
  ];

  constructor(private iconRegistry: MdIconRegistry,
              private domSanitizer: DomSanitizer,
              private commandService: CommandService,
              private activatedRoute: ActivatedRoute) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'ydam-logo',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/ydam-logo.svg'));

    this.commandService.sendCmd$.subscribe(command => {
      if (command === AppConstants.CMD_TOGGLE_NAV) {
        this.toggleSideNav();
      }
    });
  }

  ngOnInit() {
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
