import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  user: Usuario;
  showtemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean {
    if (this.user == null) {
      return false;
    }
    return this.user.email !== '';
  }
}
