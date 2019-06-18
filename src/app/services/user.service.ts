import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { EVENTOS_API } from './eventos.api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    return this.http.post(`${EVENTOS_API}/v1/usuario/login`, usuario);
  }

}
