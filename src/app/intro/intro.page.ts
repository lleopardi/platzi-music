import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides = [
    {
      title: 'titulo 1',
      subTitle: 'Subtitle 1',
      description: 'Description 1',
      icon: 'play'
    },
    {
      title: 'titulo 2',
      subTitle: 'Subtitle 2',
      description: 'Description 2',
      icon: 'play'
    },
    {
      title: 'titulo 3',
      subTitle: 'Subtitle 3',
      description: 'Description 3',
      icon: 'play'
    }
  ];

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/home');
  }

}
