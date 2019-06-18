import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new Usuario(null, '', '', '');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  login() {
    this.message = '';
    this.userService.login(this.user).subscribe((userAuthentication: Usuario) => {
      this.shared.user = userAuthentication;
      if (this.shared.user !== null) {
        this.shared.showtemplate.emit(true);
        this.router.navigate(['/']);
      } else {
        this.showMessage({
          type: 'error',
          text: 'Email ou Senha inválidos'
        });
      }
    }, error => {
      this.shared.user = null;
      this.shared.showtemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin() {
    this.message = '';
    this.user = new Usuario(null, '', '', '');
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty: boolean): {} {
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
