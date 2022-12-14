import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API_SERVER = "http://localhost:8080/usuarios/";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getAllUsuariosByCargo(id): Observable<any>{
    return this.httpClient.get(this.API_SERVER+id)
  }

}
