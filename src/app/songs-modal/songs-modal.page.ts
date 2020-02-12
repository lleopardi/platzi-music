import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  songs: any[];
  artist: string;

  constructor(
    private params: NavParams,
    private modal: ModalController
  ) { }

  ionViewDidEnter() {
    this.songs = this.params.data.songs;
    this.artist = this.params.data.artist;
  }

  async selectSong(song: any) {
    await this.modal.dismiss(song);
  }

}
