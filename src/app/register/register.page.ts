import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  validationMessages = {
    name: [
      {
        type: 'required', message: 'El nombre es requerido'
      }
    ],
    lastName: [
      {
        type: 'required', message: 'El apellido es requerido'
      }
    ],
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
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
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

  registerUser(user) {
    console.log(user)
    this.authService.registerUser(user).then((response) => {
     this.errorMessage = '';
     this.goToLogin();
    }).catch(error => this.errorMessage = error);
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }


}
