import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import { DialogService } from '../../dialog.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  shared: SharedService;
  message: {};
  classCss: {};
  listEvento = [];

  constructor(
    private dialogService: DialogService,
    private eventoService: EventoService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.eventoService.findAllFromUser(this.shared.user.id).subscribe((response: [Evento]) => {
      this.listEvento = response;
    }, err => {
      console.log(err);
      this.showMessage({
        type: 'error',
        text: err['message']
      });
    });
  }

  add() {
    this.router.navigate(['evento-new']);
  }

  edit(id: number) {
    this.router.navigate(['/evento-edit', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Deseja realmente excluir o evento?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.message = {};
          this.eventoService.delete(id).subscribe(() => {
            this.findAll();
          }, err => {
            this.showMessage({
              type: 'error',
              text: err.error.message
            });
          });
        }
      });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' + type] = true;
  }

}
