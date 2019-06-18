import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evento } from 'src/app/model/evento.model';
import { NewParticipacao } from 'src/app/model/new-participacao.model';
import { ParticipacaoEvento } from 'src/app/model/participacaoEvento.model';
import { EventoService } from 'src/app/services/evento.service';
import { ParticipacaoEventoService } from 'src/app/services/participacao.evento.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-evento-detail',
    templateUrl: './evento-detail.component.html',
    styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    evento = new Evento(null, '', '', null, null);
    participacaoEvento = new ParticipacaoEvento(null, '', null, null);
    newParticipacao = new NewParticipacao(null, null);
    shared: SharedService;
    message: {};
    classCss: {};

    constructor(
        private eventoService: EventoService,
        private participacaoEventoService: ParticipacaoEventoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.shared = SharedService.getInstance();
    }

    ngOnInit() {
        const id: number = this.route.snapshot.params['id'];
        if (id !== undefined) {
            this.findById(id);
        }
    }

    findById(id: number) {
        this.eventoService.findById(id).subscribe((response: Evento) => {
            console.log('responseApi -->  ', response);
            this.evento = response;
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.message
            });
        });
    }

    subscribe() {
        this.newParticipacao = new NewParticipacao(this.shared.user.id, this.evento.id);
        this.participacaoEventoService.insert(this.newParticipacao).subscribe((response: ParticipacaoEvento) => {
            console.log('responseApi -> ', response);
            this.participacaoEvento = response;
            this.router.navigate(['/participacao-detail', this.participacaoEvento.id]);
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.message
            });
        });
    }

    cancel() {
        this.router.navigate(['/todos-eventos-list']);
    }

    getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
        return {
            'form-group': true,
            'has-error': isInvalid && isDirty,
            'has-success': !isInvalid && isDirty
        };
    }

    private showMessage(message: { type: string, text: string }): void {
        this.message = message;
        this.buildClasses(message.type);
        setTimeout(() => {
            this.message = undefined;
        }, 3000);
    }

    private buildClasses(type: string): void {
        this.classCss = {
            'alert': true
        };
        this.classCss['alert-' + type] = true;
    }
}
