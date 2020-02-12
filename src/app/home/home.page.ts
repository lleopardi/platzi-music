import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { PlatziMusicService } from '../services/platzi-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: any = {};

  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) { }


  ionViewDidEnter() {
    forkJoin({
      newReleases: this.musicService.getNewReleases(),
      artists: this.musicService.getArtists()
    }).subscribe(({ newReleases, artists }) => {
      this.songs = newReleases.albums.items.filter(e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(e => e.album_type === 'album');
      this.artists = artists;
    });
  }

  showSongs(artist) {
    let modalRef;
    this.musicService.getArtistTopTrack(artist.id).pipe(
      tap(data => console.log(data)),
      mergeMap((songs: any) => this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          songs: songs.tracks,
          artist: artist.name
        }
      }))
    ).subscribe((modal) => {
      modalRef = modal;

      modalRef.onDidDismiss().then(dataReturned => {
        if (dataReturned) {
          this.song = dataReturned.data;
        }
      });


      modalRef.present();
    });
  }

}
