import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


export enum appSections {
  home = 'menu/home',
  settings = 'menu/settings',
  sports = 'menu/sports'
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  itemsMenu = appSections;

  constructor(
    private menu: MenuController,
    private nav: NavController,
    private storage: Storage
  ) { }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.storage.remove('isUserLoggedIn');
    this.nav.navigateRoot('/login');
  }

  goToModule(module: appSections = this.itemsMenu.home) {
    this.nav.navigateForward(module);
    this.closeMenu();
  }

}
