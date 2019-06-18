import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoFilter } from 'src/app/model/evento.filter.model';
import { Evento } from 'src/app/model/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-todos-eventos-list',
  templateUrl: './todos-eventos-list.component.html',
  styleUrls: ['./todos-eventos-list.component.css']
})
export class TodosEventosListComponent implements OnInit {

  shared: SharedService;
  message: {};
  classCss: {};
  listEvento = [];
  eventoFilter: EventoFilter = new EventoFilter('', '', null, null, '');

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll();
  }

  filter() {
    this.findByParams();
  }

  cleanFilter() {
    this.eventoFilter = new EventoFilter('', '', null, null, '');
    this.findAll();
  }

  findAll() {
    this.eventoService.findAll().subscribe((response: [Evento]) => {
      this.listEvento = response;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.message
      });
    });
  }

  findByParams() {
    this.eventoService.findByParams(this.eventoFilter).subscribe((response: [Evento]) => {
      this.listEvento = response;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.message
      });
    });
  }

  detail(id: string) {
    this.router.navigate(['/evento-detail', id]);
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
