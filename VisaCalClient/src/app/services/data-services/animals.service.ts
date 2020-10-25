import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpBaseService } from './http-base.service';
import { Observable } from 'rxjs';
import { Animal } from "../../models/Animal";

// used for old non-grid version of output templates screen
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AnimalService extends HttpBaseService {

  private endPointName = 'animals';
  private auth_token: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth_token}` });
  
  //headers: req.headers.set("Authorization", "Bearer " + idToken);

  constructor(
    private http: HttpClient,) {
    super(http);

    //// used for old non-grid version of output templates screen
    //// get preview of all output templates (without inactive templates)
    //this.getAllItems(false);
    //this.getAllTpls(false);
  }

  // returns newly created template
  addOrUpdateAnimal(item: Animal): Observable<any> {
    let url = `${this.endPointName}`;
    return this.putBase(url, item, this.getHeader());
      //.catch((err) => {
      //  let info: any = err;
      //  info.dataItem = item;
      //  return this.logService.logHttpError('error adding animal', info);
      //})
      ;
  }

  getAllAnimals(): Observable<any> {
    let url = `${this.endPointName}`;
    let errMsg = `error getting all animals.`;
    return this.getBase(url, this.getHeader());

  }

  private getHeader(): any {
    this.auth_token = localStorage.getItem('ACCESS_TOKEN');
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth_token}` })
  }

  // returns received animal
  getAnimalByName(name: string): Observable<any> {
    let url = `${this.endPointName}/${name}`;
    let errMsg = `error getting animal. name: ${name}`;
    this.auth_token = localStorage.getItem('ACCESS_TOKEN');
    return this.getBase(url, this.headers);
  }

  //deleteTemplate(id: number): Observable<any> {
  //  let url = `${this.endPointName}/${id}`;
  //  let errMsg = `error deleting output template. id: ${id}`;
  //  return this.deleteBase(url, errMsg);

  //  //return this._http.delete(`${this.baseUri}/${id}`)
  //  //  .catch((err) => { return this._logService.logHttpError(`error deleting output template. id: ${id}`, err); });
  //}
}
