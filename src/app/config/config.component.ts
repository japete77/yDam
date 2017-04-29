import { Component, OnInit } from '@angular/core';

import { AppConstants } from '../app.constants';
import { CommandService } from '../services/command/command.service';

@Component({
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private commandService: CommandService) { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.commandService.sendCommand(AppConstants.CMD_TOGGLE_NAV);
  }

}
