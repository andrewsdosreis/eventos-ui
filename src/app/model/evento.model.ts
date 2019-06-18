import { Usuario } from './usuario.model';

export class Evento {
    constructor(
        public id: number,
        public titulo: string,
        public descricao: string,
        public data: Date,
        public organizador: Usuario
    ) { }
}