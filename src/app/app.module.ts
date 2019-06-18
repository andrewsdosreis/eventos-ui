import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';
import { EventoEditComponent } from './components/evento-edit/evento-edit.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoNewComponent } from './components/evento-new/evento-new.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParticipacaoDetailComponent } from './components/participacao-detail/participacao-detail.component';
import { ParticipacaoListComponent } from './components/participacao-list/participacao-list.component';
import { AuthGuard } from './components/security/auth.guard';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { LoginComponent } from './components/security/login/login.component';
import { TodosEventosListComponent } from './components/todos-eventos-list/todos-eventos-list.component';
import { DialogService } from './dialog.service';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    EventoListComponent,
    EventoNewComponent,
    EventoDetailComponent,
    EventoEditComponent,
    TodosEventosListComponent,
    ParticipacaoListComponent,
    ParticipacaoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [
    UserService,
    SharedService,
    DialogService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
