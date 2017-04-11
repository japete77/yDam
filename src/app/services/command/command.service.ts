import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommandService {

  // Observable string sources
  private sendCommandSource = new Subject<string>();

  // Observable string streams
  sendCmd$ = this.sendCommandSource.asObservable();

  constructor() { }

  // Service message commands
  sendCommand(mission: string) {
    this.sendCommandSource.next(mission);
  }

}
