import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core';

import { AppConstants } from '../app.constants';
import { IAsset } from '../models/asset';
import { AssetService } from '../services/asset/asset.service';
import { CommandService } from '../services/command/command.service';

@Component({
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  private loadingAssetsName = 'loadingAssets';

  assets: IAsset[] = [];
  moreAssets: boolean;
  lastTextSearch: string;
  loading: boolean;

  constructor(private assetService: AssetService,
              private dialogService: TdDialogService,
              private viewContainerRef: ViewContainerRef,
              private loadingService: TdLoadingService,
              private commandService: CommandService) {
    this.moreAssets = true;
    this.lastTextSearch = '';
  }

  ngOnInit() {
    this.loadingService.register(this.loadingAssetsName);
    setTimeout(() => {
      this.getNextAssets(this.lastTextSearch);
    });
  }

  toggleSideNav() {
    this.commandService.sendCommand(AppConstants.CMD_TOGGLE_NAV);
  }

  onScrollDown(): void {
    this.getNextAssets(this.lastTextSearch);
  }

  clear(): void {
    this.moreAssets = true;
    this.assets = [];
  }

  searchEvent(text: string) {
    this.clear();
    this.getNextAssets(text);
  }

  private getNextAssets(text: string) {
    if (this.moreAssets) {
      this.loading = true;
      this.loadingService.register(this.loadingAssetsName);
      this.assetService.getAssets(this.assets.length, text)
      .then((results: IAsset[]) => {
        this.moreAssets = results.length >= this.assetService.getPageSize();
        this.assets = this.assets.concat(results);
        this.loading = false;
        this.loadingService.resolve(this.loadingAssetsName);
      })
      .catch((reason: any) => {
        this.loading = false;
        this.loadingService.resolve(this.loadingAssetsName);
        this.dialogService.openAlert({
          message: 'Error retriving assets, please check the availability of the asset service API. Review console logs for more details.',
          disableClose: true,
          viewContainerRef: this.viewContainerRef,
          title: 'Error',
          closeButton: 'Close',
        });
        console.log(reason);
      });
    }
  }

}
