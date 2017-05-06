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
    const url: string = this.baseUrl + 'Models/Get';

    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return response.json() as IMetadataModel[];
      });
  }

  saveModels(models: IMetadataModel[]): Promise<Response> {

    const url: string = this.baseUrl + 'Models/Update';

    return this.http.post(url, models)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((reason) => {
        return reason;
      });
  }

  importModels(modelsFile: any): Promise<Response> {
    const input = new FormData();
    input.append('file', modelsFile);

    const url: string = this.baseUrl + 'Models/Import';

    return this.http.post(url, input)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((reason) => {
        return reason;
      });
  }

  exportModels(): Promise<boolean> {
    const url: string = this.baseUrl + 'Models/Export';

    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const file = new Blob([response], {type: 'application/octect-stream'});
        const fileURL = URL.createObjectURL(file);
        window.open(url, '_self', 'width=1,height=1');
        return true;
      })
      .catch((reason) => {
        return false;
      });
  }
}
