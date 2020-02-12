import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as dataArtist from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  constructor(private http: HttpClient) { }

  getNewReleases(): Observable<any> {
    const api = 'https://platzi-music-api.now.sh/browse/new-releases';
    return this.http.get(api);
  }

  getArtists(): Observable<any> {
    return of(dataArtist.items);
  }

  getArtistTopTrack(artistId) {
    const api = `https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO`;
    return this.http.get(api);
  }
}
