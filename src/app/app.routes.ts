import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '../../node_modules/@angular/core';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';
import { EventoEditComponent } from './components/evento-edit/evento-edit.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoNewComponent } from './components/evento-new/evento-new.component';
import { HomeComponent } from './components/home/home.component';
import { ParticipacaoDetailComponent } from './components/participacao-detail/participacao-detail.component';
import { ParticipacaoListComponent } from './components/participacao-list/participacao-list.component';
import { AuthGuard } from './components/security/auth.guard';
import { LoginComponent } from './components/security/login/login.component';
import { TodosEventosListComponent } from './components/todos-eventos-list/todos-eventos-list.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'evento-list', component: EventoListComponent, canActivate: [AuthGuard] },
    { path: 'evento-new', component: EventoNewComponent, canActivate: [AuthGuard] },
    { path: 'evento-detail/:id', component: EventoDetailComponent, canActivate: [AuthGuard] },
    { path: 'evento-edit/:id', component: EventoEditComponent, canActivate: [AuthGuard] },
    { path: 'todos-eventos-list', component: TodosEventosListComponent, canActivate: [AuthGuard] },
    { path: 'participacao-detail/:id', component: ParticipacaoDetailComponent, canActivate: [AuthGuard] },
    { path: 'participacao-list', component: ParticipacaoListComponent, canActivate: [AuthGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
