import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credentials) {
    // this.storage.get('user').then((user) => {
    //   if((user.password === credentials.password) && (user.email === credentials.email ) ){
    //     accept('Login correcto');
    //   }
    // });
    return new Promise((accept, reject) => {
      if (credentials.email === 'test@test.com' && credentials.password === '12345') {
        accept('Login correcto');
      } else {
        reject('Login incorrrecto');
      }
    });
  }

  registerUser(userData) {
    return this.storage.set('user', userData);
  }
}
