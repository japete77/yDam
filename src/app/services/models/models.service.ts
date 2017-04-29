import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from '@nglibs/config';
import { IMetadataModel } from 'app/models/metadata-model';

@Injectable()
export class ModelsService {

  private baseUrl: string = this.config.getSettings('system', 'dam_api');

  constructor(private http: Http, private config: ConfigService) { }

  getModels(): Promise<IMetadataModel[]> {
    const url: string = this.baseUrl + 'Models';

    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return response.json() as IMetadataModel[];
      });
  }

  saveModels(models: IMetadataModel[]): Promise<boolean> {
    const url: string = this.baseUrl + 'Models';

    return this.http.post(url, models)
      .toPromise()
      .then((response) => {
        return response.ok;
      });
  }

  exportModels() {
    const url: string = this.baseUrl + 'Export';
    window.open(url, '_self', 'width=1,height=1');

    // return this.http.get(url)
    //   .toPromise()
    //   .then((response) => {
    //     const file = new Blob([response], {type: 'application/octect-stream'});
    //     const fileURL = URL.createObjectURL(file);
    //     window.open(url);
    //   });
  }
}
