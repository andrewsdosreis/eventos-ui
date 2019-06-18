import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-evento-edit',
    templateUrl: './evento-edit.component.html',
    styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    evento = new Evento(null, '', '', null, null);
    shared: SharedService;
    message: {};
    classCss: {};

    constructor(
        private eventoService: EventoService,
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

    update() {
        console.log(this.evento);
        this.eventoService.createOrUpdate(this.evento).subscribe((response: Evento) => {
            console.log('responseApi -->  ', response);
            this.evento = response;
            this.router.navigate(['evento-list']);
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.message
            });
        });
    }

    cancel() {
        this.router.navigate(['evento-list']);
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
