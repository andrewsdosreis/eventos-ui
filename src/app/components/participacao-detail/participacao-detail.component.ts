import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/dialog.service';
import { ParticipacaoEvento } from 'src/app/model/participacaoEvento.model';
import { ParticipacaoEventoService } from 'src/app/services/participacao.evento.service';
import { SharedService } from '../../services/shared.service';


@Component({
    selector: 'app-participacao-detail',
    templateUrl: './participacao-detail.component.html',
    styleUrls: ['./participacao-detail.component.css']
})
export class ParticipacaoDetailComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    participacaoEvento = new ParticipacaoEvento(null, '', null, null);
    shared: SharedService;
    message: {};
    classCss: {};

    constructor(
        private dialogService: DialogService,
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
        this.participacaoEventoService.findById(id).subscribe((response: ParticipacaoEvento) => {
            console.log('responseApi -->  ', response);
            this.participacaoEvento = response;
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.message
            });
        });
    }

    unsubscribe() {
        this.dialogService.confirm('Deseja cancelar sua participação?\n:(')
            .then((candelete: boolean) => {
                if (candelete) {
                    this.message = {};
                    this.participacaoEventoService.delete(this.participacaoEvento.id).subscribe(() => {
                        this.showMessage({
                            type: 'success',
                            text: `Cancelamento efetuado com sucesso!`
                        });
                        this.router.navigate(['/participacao-list']);
                    }, err => {
                        this.showMessage({
                            type: 'error',
                            text: err.error.message
                        });
                    });
                }
            });
    }

    cancel() {
        this.router.navigate(['/participacao-list']);
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
