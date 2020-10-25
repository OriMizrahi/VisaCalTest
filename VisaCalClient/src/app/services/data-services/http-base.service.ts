import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

//import { AppConfigService } from 'app/app-config.service';
//import { LoggerService } from 'app/services/logger.service';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class HttpBaseService {

  protected baseApiUrl: string;

  constructor(private _http: HttpClient){

    this.baseApiUrl = `${environment.apiUrl}/`;
  }

  protected getBase(url: string, header: any): Observable<any> {
    return this._http.get(this.baseApiUrl + url, { headers: header })
      //.catch((err) => { return this._logService.logHttpError(errMsg, err); });
  }

  protected putBase(url: string, data: any, header: any): Observable<any> {
    return this._http.put(this.baseApiUrl + url, data, { headers: header })
      //.catch((err) => { return this._logService.logHttpError(errMsg, err); });
  }

  protected deleteBase(url: string, errMsg: string): Observable<any> {
    return this._http.delete(this.baseApiUrl + url)
      //.catch((err) => { return this._logService.logHttpError(errMsg, err); });
  }

  protected postBase(url: string, data: any, header: any): Observable<any> {
    return this._http.post(this.baseApiUrl + url, data, { headers: header });
      //.catch(err => this._logService.logHttpError(errMsg, err));
  }
}
