import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DynamicComponentModule } from 'ng-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule, MdCard, MdCardTitle, MdCardSubtitle, MdCardHeader, MdCardContent } from '@angular/material';
import { CovalentCoreModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { TdLoadingService } from '@covalent/core';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ConfigModule, ConfigLoader, ConfigHttpLoader } from '@nglibs/config';
import { NgTemplate } from 'ng-template';

import { AppComponent } from './app.component';
import { SearchToolbarComponent } from './search-toolbar/search-toolbar.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { AssetTileComponent } from './asset-tile/asset-tile.component';
import { AssetService } from './services/asset/asset-service';

export function configFactory(http: Http): ConfigLoader {
  return new ConfigHttpLoader(http, '/config.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SearchToolbarComponent,
    MainContainerComponent,
    AssetTileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentSearchModule.forRoot(),
    DynamicComponentModule.forRoot({
    }),
    InfiniteScrollModule,
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
      deps: [Http]
    }),
    CovalentDialogsModule,
  ],
  providers: [ AssetService, TdLoadingService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }