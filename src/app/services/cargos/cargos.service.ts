import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private API_SERVER = "http://localhost:8080/cargo/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllCargos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }
}
