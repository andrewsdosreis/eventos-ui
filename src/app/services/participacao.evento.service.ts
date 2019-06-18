import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewParticipacao } from '../model/new-participacao.model';
import { ParticipacaoEvento } from '../model/participacaoEvento.model';
import { EVENTOS_API } from './eventos.api';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipacaoEventoService {

  shared: SharedService;

  constructor(private http: HttpClient) {
    this.shared = SharedService.getInstance();
  }

  insert(newParticipacao: NewParticipacao) {
    return this.http.post(`${EVENTOS_API}/v1/participacaoevento`, newParticipacao);
  }

  update(participacaoEvento: ParticipacaoEvento) {
    return this.http.post(`${EVENTOS_API}/v1/participacaoevento/${participacaoEvento.id}`, participacaoEvento);
  }

  findAll() {
    return this.http.get(`${EVENTOS_API}/v1/participacaoevento/usuario/${this.shared.user.id}`);
  }

  findById(id: number) {
    return this.http.get(`${EVENTOS_API}/v1/participacaoevento/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${EVENTOS_API}/v1/participacaoevento/${id}`);
  }

}