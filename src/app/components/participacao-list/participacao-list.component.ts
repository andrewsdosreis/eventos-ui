import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipacaoEvento } from 'src/app/model/participacaoEvento.model';
import { ParticipacaoEventoService } from 'src/app/services/participacao.evento.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-participacao-list',
  templateUrl: './participacao-list.component.html',
  styleUrls: ['./participacao-list.component.css']
})
export class ParticipacaoListComponent implements OnInit {

  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listParticipacaoEvento = [];

  constructor(
    private participacaoEventoService: ParticipacaoEventoService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.participacaoEventoService.findAll().subscribe((response: [ParticipacaoEvento]) => {
      this.listParticipacaoEvento = response;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.message
      });
    });
  }

  detail(id: number) {
    this.router.navigate(['/participacao-detail', id]);
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
