import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core';

import { IAsset } from '../models/asset';
import { AssetService } from '../services/asset/asset-service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  private loadingAssetsName = 'loadingAssets';

  assets: IAsset[] = [];
  moreAssets: boolean;
  lastTextSearch: string;
  loading: boolean;

  constructor(private iconRegistry: MdIconRegistry,
              private domSanitizer: DomSanitizer,
              private assetService: AssetService,
              private dialogService: TdDialogService,
              private viewContainerRef: ViewContainerRef,
              private loadingService: TdLoadingService) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'ydam-logo',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/ydam-logo.svg'));

    this.moreAssets = true;
    this.lastTextSearch = '';
  }

  ngOnInit() {
    this.loadingService.register(this.loadingAssetsName);
    setTimeout(() => {
      this.getNextAssets(this.lastTextSearch);
    });
  }

  toggleSideNav(): void {
    this.sidenav.toggle();
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
