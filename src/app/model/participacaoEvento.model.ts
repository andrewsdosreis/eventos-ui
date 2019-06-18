import { Usuario } from './usuario.model';
import { Evento } from './evento.model';

export class ParticipacaoEvento {
    constructor(
        public id: number,
        public ticket: string,
        public usuario: Usuario,
        public evento: Evento
    ) { }
}