import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '@nglibs/config';

import { IAsset } from '../../models/asset';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AssetService {

  private baseUrl: string = this.config.getSettings('system', 'dam_api');
  private pageSize: number = this.config.getSettings('system', 'page_size');

  constructor(private http: Http, private config: ConfigService) { }

  getAssets(skip: number, text: string): Promise<IAsset[]> {
    let url: string = this.baseUrl +
      'Asset?MaxResults=' + this.pageSize +
      '&Skip=' + skip;

    if (text) {
      url += '&SearchText=' + encodeURI(text);
    }

    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return response.json().results as IAsset[];
      });
  }

  getPageSize(): number {
    return this.pageSize;
  }

}
