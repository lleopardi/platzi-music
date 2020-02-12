import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validationMessages = {
    email: [
      {
        type: 'required', message: 'El email es requerido'
      },
      {
        type: 'email', message: 'El email no es válido'
      }
    ],
    password: [
      {
        type: 'required', message: 'El password es requerido'
      },
      {
        type: 'minLegth', message: 'La longitud mínima es 5 caracteres'
      }
    ]
  };

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    });
  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then((response) => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
    }).catch(error => this.errorMessage = error);
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
