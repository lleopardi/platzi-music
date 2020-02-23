import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PlatziMusicService } from '../../../services/platzi-music.service';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-tracks-finder',
  templateUrl: './tracks-finder.component.html',
  styleUrls: ['./tracks-finder.component.scss'],
})
export class TracksFinderComponent {

  listTracks: any[];
  currentSong: HTMLAudioElement = new Audio();
  selectedSong: any;
  playing = false;
  finished: Observable<boolean>;

  constructor(private musicService: PlatziMusicService) {
  }

  onChangeInput(parameter: string) {
    if (parameter.length) {
      this.musicService.searchTracks(parameter).pipe(
        map(({ tracks }: any) => {
          return tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              preview_url: track.preview_url,
              playing: false
            };
          });
        }
        )
      ).subscribe(tracks => this.listTracks = tracks)
        ;
    }
  }

  play(track: any) {
    this.selectedSong = track;
    const songUrl = track.preview_url;
    if (songUrl) {
      this.currentSong.src = track.preview_url;
      this.currentSong.play();
      this.playing = true;
    } else {
      console.log('No se pudo cargar la canción');
    }

    fromEvent(this.currentSong, 'ended').subscribe(finis => this.pause());

  }

  pause() {
    this.currentSong.pause();
    this.playing = false;
  }

  isSelected(track) {
    return track === this.selectedSong;
  }

}
