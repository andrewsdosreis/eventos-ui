import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoFilter } from '../model/evento.filter.model';
import { Evento } from '../model/evento.model';
import { EVENTOS_API } from './eventos.api';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  shared: SharedService;

  constructor(private http: HttpClient) {
    this.shared = SharedService.getInstance();
  }

  createOrUpdate(evento: Evento) {
    if (evento.id != null) {
      return this.http.post(`${EVENTOS_API}/v1/evento/${evento.id}`, evento);
    } else {
      evento.id = null;
      return this.http.post(`${EVENTOS_API}/v1/evento`, evento);
    }
  }

  findAll() {
    return this.http.get(`${EVENTOS_API}/v1/evento/`);
  }

  findByParams(filter: EventoFilter) {
    return this.http.post(`${EVENTOS_API}/v1/evento/filter`, filter);
  }

  findAllFromUser(idUsuario: number) {
    return this.http.get(`${EVENTOS_API}/v1/evento/usuario/${idUsuario}`);
  }

  findById(id: number) {
    return this.http.get(`${EVENTOS_API}/v1/evento/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${EVENTOS_API}/v1/evento/${id}`);
  }
}
