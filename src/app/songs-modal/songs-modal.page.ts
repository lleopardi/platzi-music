import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  songs: any[];
  title: string;
  type: string;

  constructor(
    private params: NavParams,
    private modal: ModalController
  ) { }

  ionViewDidEnter() {
    this.songs = this.params.data.songs;
    this.title = this.params.data.title;
    this.type = this.params.data.type;
  }

  async selectSong(song: any) {
    await this.modal.dismiss(song);
  }

}
