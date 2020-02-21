import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin, fromEvent, Observable } from 'rxjs';
import { mergeMap, tap, takeUntil } from 'rxjs/operators';

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

  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
      preview_url: '',
      playing: false,
      name: ''
    };

  newTime;
  currentSong: HTMLAudioElement = new Audio();

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

  showSongs(element) {
    console.log(element);
    let sourceData: Observable<any>;
    const isArtist = element.type === 'artist';
    let songsList: any;
    let modalRef: HTMLIonModalElement;
    let title: string;
    if (isArtist) {
      sourceData = this.musicService.getArtistTopTrack(element.id);
      title = element.name + ' Top Tracks';
    } else {
      sourceData = this.musicService.getAlbumTracks(element.id);
      title = element.name + ' Album Tracks';
    }

    sourceData.pipe(
      mergeMap((songs: any) => {
        if (isArtist) {
          songsList = songs.tracks;
        } else {
          songsList = songs.items;
        }
        return this.modalController.create({
          component: SongsModalPage,
          componentProps: {
            songs: songsList,
            title,
            type: element.type
          }
        });
      }
      )
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

  play() {
    const songUrl = this.song.preview_url;
    if (songUrl) {
      this.currentSong.src = this.song.preview_url;
      this.currentSong.play();
      this.currentSong.addEventListener('timeupdate', () => {
        this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
      });
      this.song.playing = true;
    } else {
      // TODO: implementar
      console.log('No se pudo cargar la canción');
    }

  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time: number) {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }

      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }


}
